import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateAdminDto {
    
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    telegram_link: string;
    

    admin_photo: string;

    @IsStrongPassword()
    @MinLength(6)
    password: string;
    
    
    @IsStrongPassword()
    @MinLength(6)
    confirm_password: string;



}
