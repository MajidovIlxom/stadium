import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './Models/admin.models';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo: typeof Admin ){}

  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepo.create(createAdminDto)
    return admin
  }

  findAll() {
    const admin = this.adminRepo.findAll()
    return admin;
  }

  findOne(id: number) {
    const admin = this.adminRepo.findOne({where: {id: id}})
    return admin;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = this.adminRepo.update(updateAdminDto, {where: {id: id}})
    return admin[1][0];
  }

  remove(id: number) {
    const admin = this.adminRepo.destroy({where: {id: id}})
    if (!admin){
      throw new HttpException("Admin topilmadi", HttpStatus.NOT_FOUND)
    }
    return {message: "Admin o'chirildi"};
  }
}
