import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStadiumDto {
    
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsString()
    @IsNotEmpty()
    contact_with: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    regionId: number;

    @IsNumber()
    @IsNotEmpty()
    districtId: number;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsDateString()
    buildAt: Date;

    @IsString()
    @IsDateString()
    start_time: Date;

    @IsString()
    @IsDateString()
    end_time: Date;
}
