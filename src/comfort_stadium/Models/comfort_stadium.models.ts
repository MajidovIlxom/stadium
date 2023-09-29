
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ComfortStadiumCreateAttrs {
    stadiumId: number;
    comfortId: number;
}

@Table({tableName: "comfortstadiums"})
export class ComfortStadium extends Model<ComfortStadium, ComfortStadiumCreateAttrs>{
    @ApiProperty({example: 1, description: "Id serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ApiProperty({example: "stadium ID", description: "konfor_stadion Idsi kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    stadiumId: number;

    @ApiProperty({example: "comfort ID", description: "qulaylik id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    comfortId: number;
}
