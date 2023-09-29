import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("district")
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({summary: "tuman ni yaratish"})
  @Post('create')
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({summary: "tuman hammasini ko'raolish"})
  @Get('all')
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({summary: "tumanni idsi bo'yicha ko'rish"})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({summary: "tumanni o'zgartirish"})
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({summary: "tumanni o'chirish"})
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
