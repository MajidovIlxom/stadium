import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("region")
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({summary: "Regionni yaratish"})
  @Post('create')
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({summary: "Regionlarni hammasini kurish"})
  @Get('all')
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({summary: "Regionlarni Idsi buyicha kurish "})
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({summary: "Regionlarni o'zgartirish"})
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({summary: "Regionlarni o'chirish"})
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
