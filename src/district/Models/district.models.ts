import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "src/region/Models/region.models";

interface DistrictCreateAttrs {
    name: string;
    regionId: number;
}

@Table({tableName: "districts"})
export class District extends Model<District, DistrictCreateAttrs>{
    @ApiProperty({example: 1, description: "Id serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ApiProperty({example: "district name", description: "Tuman nomi kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ForeignKey(() => Region)
    @ApiProperty({example: "district regionId", description: "Viloyat id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    regionId: number;

    @ApiProperty({example: "[regions]", description: "Mintaqalar"})
    @BelongsTo(()=> Region)
    regions: Region[]

}
