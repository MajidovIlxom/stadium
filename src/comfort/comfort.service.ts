import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './Models/comfort.models';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private readonly comfortRepo: typeof Comfort){}
  
  async create(createComfortDto: CreateComfortDto) {
    const comfort = await this.comfortRepo.create(createComfortDto)
    return comfort;
  }

  async findAll() {
    const comfort = await this.comfortRepo.findAll({include: {all: true}})
    return comfort;
  }

  async findOne(id: number) {
    const comfort = await this.comfortRepo.findOne({
      where: { id: id},
      include: {all: true},
    })
    return comfort;
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    const comfort = await this.comfortRepo.update(updateComfortDto, {where: { id: id} ,returning: true})
    return comfort[1][0];
  }

  async remove(id: number) {
    const comfort = await this.comfortRepo.destroy({where: { id: id}})
    if (!comfort) {
      throw new HttpException("Comfort zona topilmadi", HttpStatus.NOT_FOUND)
    }
    
    return {message: "Comfort zona O'chirildi"};
  }
}
