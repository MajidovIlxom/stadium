import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './Models/category.models';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryRepo: typeof Category){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create(createCategoryDto)
    return category;
  }

  findAll() {
    const category = this.categoryRepo.findAll({include: {all: true}});
    return category;
  }

  findOne(id: number) {
    const category = this.categoryRepo.findByPk(id, {include: {all: true}})
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.categoryRepo.update(updateCategoryDto, {where: {id: id}, returning: true})
    
    return category[1][0];
  }

  async remove(id: number) {
    const category = await this.categoryRepo.destroy({where: {id}});
    if(!category){
      throw new HttpException("Kategoreya topilmadi",HttpStatus.NOT_FOUND)
    }
    return {message: "Kategoreya o'chirildi"};
  }
}
