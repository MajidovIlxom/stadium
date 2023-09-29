import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './Models/stadium.models';

@Injectable()
export class StadiumsService {
  constructor(@InjectModel(Stadium) private readonly stadiumRepo: typeof Stadium){}


  async create(createStadiumDto: CreateStadiumDto) {
    const stadium = await this.stadiumRepo.create(createStadiumDto)
    return stadium;
  }

  async findAll() {
    const stadium = await this.stadiumRepo.findAll({include:{all: true}})
    return stadium;
  }

  async findOne(id: number) {
    const stadium = await this.stadiumRepo.findOne({where: {id: id}})
    return stadium;
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const stadium = await this.stadiumRepo.update(updateStadiumDto, {where: {id: id}, returning: true})
    return stadium[1][0];
  }

  async remove(id: number) {
    const stadium = await this.stadiumRepo.destroy({where: {id}})
    if (!stadium){
      throw new HttpException("Stadion topilmadi", HttpStatus.NOT_FOUND)
    }
    return {message: "Stadion o'chirildi"}
  }
}
