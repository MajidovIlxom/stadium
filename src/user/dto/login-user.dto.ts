import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class LogenUserDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @MinLength(6)
    password: string;
}