import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags("Stadionlar")
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({summary: "Stadionlarni yaratish"})
  @Post("create")
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @ApiOperation({summary: "Stadionlarni hammasini ko'rish"})
  @Get("all")
  findAll() {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({summary: "Stadionlarni bittasini ko'rish"})
  @Get('one:id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @ApiOperation({summary: "Stadionlarni o'zgartirish"})
  @Patch('update:id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @ApiOperation({summary: "Stadionlarni o'chirish"})
  @Delete('remove:id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
