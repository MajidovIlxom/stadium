import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Kategoriyalar')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({summary: "Kategoriyani yaratish"})
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({summary: "Kategoriyani ko'rish"})
  @Get('all')
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({summary: "Kategoriyani bittasini ko'rish"})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({summary: "Kategoriyani o'zgartirish"})
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({summary: "Kategoriyani o'chirish"})
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
