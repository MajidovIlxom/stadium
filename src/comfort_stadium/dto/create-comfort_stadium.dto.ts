import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateComfortStadiumDto {
    @IsNotEmpty()
    @IsNumber()
    stadiumId:number;

    @IsNotEmpty()
    @IsNumber()
    regionId: number;
}
