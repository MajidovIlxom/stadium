import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stadionni Komfortliklari')
@Controller('comfort-stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}


  @ApiOperation({summary: "Yartish"})
  @Post('create')
  create(@Body() createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @ApiOperation({summary: "Ko'rish"})
  @Get('all')
  findAll() {
    return this.comfortStadiumService.findAll();
  }

  @ApiOperation({summary: "Bittasini ko'rish"})
  @Get('one:id')
  findOne(@Param('id') id: string) {
    return this.comfortStadiumService.findOne(+id);
  }

  @ApiOperation({summary: "O'zgartirish"})
  @Patch('update:id')
  update(@Param('id') id: string, @Body() updateComfortStadiumDto: UpdateComfortStadiumDto) {
    return this.comfortStadiumService.update(+id, updateComfortStadiumDto);
  }

  @ApiOperation({summary: "O'chirish"})
  @Delete('remove:id')
  remove(@Param('id') id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
