// import { PartialType } from '@nestjs/swagger';
// import { CreateAdminDto } from './create-admin.dto';

// export class UpdateAdminDto extends PartialType(CreateAdminDto) {}


import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";


export class UpdateAdminDto {
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    telegram_link: string;
    

    @IsOptional()
    admin_photo: string;

    @IsStrongPassword()
    @MinLength(6)
    @IsOptional()
    hashed_password: string;
}
