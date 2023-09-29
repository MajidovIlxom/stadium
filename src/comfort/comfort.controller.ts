import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Komfortlar')
@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({summary: 'Komfortlarni yaratish'})
  @Post('create')
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({summary: "Komfortlarni ko'rish"})
  @Get('all')
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({summary: "Komfortlarni bittasini ko'rish"})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }

  @ApiOperation({summary: "Komfortlarni O'zgartirish"})
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }

  @ApiOperation({summary: "Komfortlarni o'chirish"})
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
