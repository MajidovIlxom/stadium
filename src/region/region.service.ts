import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './Models/region.models';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private readonly regionRepo: typeof Region){}
  
  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepo.create(createRegionDto)
    return region;
  }

  async findAll() {
    const region = await this.regionRepo.findAll({include: {all: true}});
    return region;
  }

  async findOne(id: number) {
    const region = await this.regionRepo.findOne({where: {id: id}});
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepo.update(updateRegionDto, {where: {id: id},returning: true});
    return region[1][0];
  }

  async remove(id: number) {
    const region = await this.regionRepo.destroy({where: {id: id}});
    if (!region) {
      throw new HttpException("Region tpilmadi", HttpStatus.NOT_FOUND)
    }
    
    return {message: "Region O'chirildi"};
  }
}
