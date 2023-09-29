import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType } from "sequelize-typescript";

interface ComfortCreationAttrs {
    name: string;
}

@Table({tableName: "comfort"})
export class Comfort extends Model<Comfort, ComfortCreationAttrs> {
    @ApiProperty({example: 1, description: "ID serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: "Comfort", description: "Comfort name"})
    @Column({
        type: DataType.STRING,
    })
    name: string;
}
