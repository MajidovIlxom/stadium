import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, HasMany, BelongsTo } from "sequelize-typescript";
import { District } from "src/district/Models/district.models";


interface RegionCreationAttrs {
    name: string;
}

@Table({tableName: "regions"})
export class Region extends Model<Region, RegionCreationAttrs> {
    @ApiProperty({example: 1, description: "ID serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: "Region", description: "Region name"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @HasMany(()=> District)
    districts: District[]
}
