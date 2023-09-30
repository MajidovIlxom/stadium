import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorator/cookieGetter.decorator';
import { UserGuard } from 'src/guards/user.guards';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './Models/admin.models';
import { LogenAdminDto } from './dto/loginAdmin.dto';
import { AdminService } from './admin.service';
import { FindAdminDto } from './dto/findAdmin.dto';


@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary: "register Admin"})
  @ApiResponse({status: 201, type: Admin})
  @Post("register")
  registeration(
    @Body() createadminDto: CreateAdminDto,
    @Res({passthrough: true}) res: Response
    ) {
    return this.adminService.registration(createadminDto, res);
  }


  @ApiOperation({summary: "login admin"})
  @ApiResponse({status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(
    @Body() loginAdminDto: LogenAdminDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({summary: "activate Admin"})
  @ApiResponse({status: 200, type: [Admin]})
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({summary: "logout Admin"})
  @ApiResponse({status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Post('logout')
  logout(
    @CookieGetter('refresh_token') refresh_token : string,
    @Res({passthrough: true}) res: Response
  ): Promise<{ message: string; admin: Admin; }>{
    console.log(refresh_token);
    return this.adminService.logout(refresh_token, res);
  }


  @ApiOperation({summary: "RefreshToken user"})
  @ApiResponse({status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refresh_token : string,
    @Res({passthrough: true}) res: Response,
  ){
    return this.adminService.refreshToken(+id, refresh_token, res);
  }


  @ApiOperation({summary: "find admin filter"})
  @ApiResponse({status: 200, type: Admin})
  @HttpCode(HttpStatus.OK)
  @Post('find')
  findAll(@Body() findAdminDto: FindAdminDto){
    return this.adminService.findAll(findAdminDto)
  }

}

