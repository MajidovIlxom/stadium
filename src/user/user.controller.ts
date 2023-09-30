import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './Models/user.models';
import { Response } from 'express';
import { LogenUserDto } from './dto/login-user.dto'
import { CookieGetter } from 'src/decorator/cookieGetter.decorator';
import { UserGuard } from 'src/guards/user.guards';
import { FindUserDto } from './dto/find.user.dto';


@ApiTags("Users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: "register user"})
  @ApiResponse({status: 201, type: User})
  @Post("signup")
  registeration(
    @Body() createUserDto: CreateUserDto,
    @Res({passthrough: true}) res: Response
    ) {
    return this.userService.registeration(createUserDto, res);
  }


  @ApiOperation({summary: "login user"})
  @ApiResponse({status: 200, type: User})
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(
    @Body() loginUserDto: LogenUserDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({summary: "activate user"})
  @ApiResponse({status: 200, type: [User]})
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({summary: "logout user"})
  @ApiResponse({status: 200, type: User})
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refresh_token : string,
    @Res({passthrough: true}) res: Response
  ): Promise<{ message: string; User: User; }>{
    console.log(refresh_token);
    return this.userService.logout(refresh_token, res);
  }


  @ApiOperation({summary: "RefreshToken user"})
  @ApiResponse({status: 200, type: User})
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refresh_token : string,
    @Res({passthrough: true}) res: Response,
  ){
    return this.userService.refreshToken(+id, refresh_token, res);
  }


  @ApiOperation({summary: "RefreshToken user"})
  @ApiResponse({status: 200, type: User})
  @HttpCode(HttpStatus.OK)
  @Post('find')
  findAll(@Body() findUserDto: FindUserDto){
    return this.userService.findAll(findUserDto)
  }

}
