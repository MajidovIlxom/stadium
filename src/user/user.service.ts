import { BadRequestException, ForbiddenException, Injectable, Optional, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './Models/user.models';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import *as bcrypt from 'bcrypt';
import {v4} from 'uuid'
import { MailService } from 'src/mail/mail.service';
import { LogenUserDto } from "./dto/login-user.dto"
import { FindUserDto } from './dto/find.user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly  jwtService: JwtService,
    
    // @Optional() private readonly password
    private readonly mailService: MailService,

  ){}


  async getToken(user: User){
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ])
    return {
      access_token: accessToken,
    refresh_token: refreshToken
  }
  }

  async registeration(createUserDto: CreateUserDto, res: Response){
    const user = await this.userRepo.findOne({
      where:{username: createUserDto.username}
    })
    if (user) {
      throw new BadRequestException("User already exists")
    }
    if (createUserDto.password !== createUserDto.confirm_password){
      throw new BadRequestException("Passwor is not match")
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password
    });
    const tokens = await this.getToken(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const  uniqueKey: string = v4();
    console.log('uniqueKey: ', uniqueKey);

    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey
    },
    {where: {id: newUser.id},returning : true}
    )
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendUserConfirmation(updatedUser[1][0])
    } catch (error) {
      console.log('error: ', error);
    }

    const respons = {
      message: "User registred",
      user: updatedUser[1][0],
      tokens,
    }
    return respons
  }

  async activate( link: string){
    if (!link){
      throw new BadRequestException('Activation link not found');
    }
    const updatedUser = await this.userRepo.update(
      {is_active: true},
      {where: {activation_link: link, is_active: false}, returning: true},
      )
    if (!updatedUser[1][0]){
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: "User activated successfully",
      user: updatedUser
    }
    return response;
  }
  async login(loginUserDto: LogenUserDto, res: Response){
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({where:{email}})
    if (!user) {
      throw new UnauthorizedException("User not registered");
    }
    if (!user.is_active) {
      throw new BadRequestException("User is not active");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashed_password)
    if (!isMatchPass) {
      throw new UnauthorizedException("User not registered(pass)");
    }
    const tokens = await this.getToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updatedUser = await this.userRepo.update(
      {hashed_refresh_token: hashed_refresh_token},
      {where: {id: user.id}, returning: true}
    );
    
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const respons = {
      message: "User logged in successfully",
      user: updatedUser[1][0],
      tokens,
    }
    return respons
  }


  async logout(refreshToken: string, res: Response) {
      try {
        const userData = await this.jwtService.verify(refreshToken,{
          secret: process.env.REFRESH_TOKEN_KEY,
        })
        if (!userData){
          throw new ForbiddenException("User Not Found")
        }
        const updateUser = await this.userRepo.update(
          {hashed_refresh_token: null},
          {where: {id: userData.id} ,returning: true}
        );
        res.clearCookie('refresh_token')
        const respons= {
          message: "User log out successfully",
          User: updateUser[1][0],
        }
        return respons;
      } catch (error) {
        console.log(error);
      }
  }
  async refreshToken(user_id:number, refreshToken: string , res: Response){
    const decodedToken = await this.jwtService.decode(refreshToken)
    if (user_id != decodedToken['id']){
      throw new BadRequestException("User not found")
    }
    const user = await this.userRepo.findOne({where: {id: user_id}})
    if (!user || !user.hashed_refresh_token){
      throw new BadRequestException("User not found")
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken, 
      user.hashed_refresh_token);
      if (!tokenMatch){
        throw new ForbiddenException("Forbidden")
      }
    const tokens = await this.getToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updatedUser = await this.userRepo.update(
      {hashed_refresh_token: hashed_refresh_token},
      {where: {id: user.id}, returning: true}
    );
    
    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    const respons = {
      message: "User refresh token",
      user: updatedUser[1][0],
      tokens,
    }
    return respons
  }

  async findAll(findUserDto: FindUserDto){
    const where= {}
    if (findUserDto.first_name){
      where['first_name'] = {
      [Op.like]: `%${findUserDto.first_name}%`,
      };
    };
    
    if (findUserDto.last_name){
      where['last_name'] = {[Op.like]: `%${findUserDto.last_name}%`}
    }

    if (findUserDto.email){
      where['email'] = {[Op.like]: `%${findUserDto.email}%`}
    }

    if (findUserDto.phone){
      where['phone'] = {[Op.like]: `%${findUserDto.phone}%`}
    }

    if (findUserDto.birthday_begin && findUserDto.birthday_end){
      where[Op.and] = {
        birthday: {
          [Op.between]: [findUserDto.birthday_begin, findUserDto.birthday_end],
        }
      }
    }
    else if (findUserDto.birthday_begin){
      where["birthday"]= {[Op.gte]: findUserDto.birthday_begin}
    }else if (findUserDto.birthday_end){
      where["birthday"]= {[Op.lte]: findUserDto.birthday_end}
    }
    console.log(where);
    const users = await User.findAll({where})
    if (!users){
      throw new BadRequestException("gfjhsgdfjdgshj")
    }
    return users;
  } 
}