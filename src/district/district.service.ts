import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './Models/district.models';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private readonly districtRepo: typeof District){}


  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtRepo.create(createDistrictDto)
    return district
  }

  async findAll() {
    const district = await this.districtRepo.findAll({include: {all: true}})
    return district
  }

  async findOne(id: number) {
    const district = await this.districtRepo.findOne({where: {id: id}, include: {all: true}})
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.update(updateDistrictDto, {where: {id: id}, returning: true})
    return district[1][0]
  }

  async remove(id: number) {
    const district = await this.districtRepo.destroy({where: {id: id}});
    if (!district) {
      throw new HttpException("district topilmadi", HttpStatus.NOT_FOUND)
    }
    
    return {message: "district O'chirildi"};
  }

}
