import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsStrongPassword()
    @MinLength(6)
    password: string;
    
    @IsStrongPassword()
    @MinLength(6)
    confirm_password: string;

    // @IsString()
    telegram_link: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @IsPhoneNumber('UZ')
    phone: string;

    // @IsString()
    user_photo: string;
    
    @IsString()
    @IsDateString()
    birthday: Date;


}
