import { Injectable } from '@nestjs/common';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ComfortStadium } from './Models/comfort_stadium.models';

@Injectable()
export class ComfortStadiumService {
  constructor(@InjectModel(ComfortStadium) private readonly comfortStadiumRepo: typeof ComfortStadium){}


  async create(createComfortStadiumDto: CreateComfortStadiumDto) {
    const comstdum = await this.comfortStadiumRepo.create(createComfortStadiumDto)
    return comstdum;
  }

  async findAll() {
    const comstdum = await this.comfortStadiumRepo.findAll();
    return comstdum
  }

  async findOne(id: number) {
    const comstdum = await this.comfortStadiumRepo.findOne({where: {id: id}});
    return comstdum;
  }

  async update(id: number, updateComfortStadiumDto: UpdateComfortStadiumDto) {
    const comstdum = await this.comfortStadiumRepo.update(updateComfortStadiumDto, {where: {id: id}, returning: true});
    return comstdum[1][0];
  }

  async remove(id: number) {
    const comstdum = await this.comfortStadiumRepo.destroy({where: {id: id}})
    return comstdum;
  }
}
