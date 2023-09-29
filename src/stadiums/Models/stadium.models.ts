import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface StadiumCreationAttrs{
    categoryId: number;
    ownerId: number;
    contact_with: string;
    name: string;
    value: string;
    address: string;
    regionId: number;
    districtId: number;
    location: string;
    buildAt: Date;
    start_time: Date;
    end_time: Date;
}

@Table({tableName: "stadium"})
export class Stadium extends Model<Stadium, StadiumCreationAttrs>{
    @ApiProperty({example: 1, description:"Id serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @ApiProperty({example: "categoryID id", description:"categoryId Id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    categoryId: number;


    @ApiProperty({example: "ownerID id", description:"ownerId Id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    ownerId: number;

    @ApiProperty({example: "contact with", description:"contact_with kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    contact_with: string;

    @ApiProperty({example: "name", description:"name kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @ApiProperty({example: "value", description:"value kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    value: string;

    @ApiProperty({example: "address", description:"address kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    address: string;

    @ApiProperty({example: "regionId id", description:"regionId Id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    regionId: number;

    @ApiProperty({example: "districtId id", description:"districtId Id kiritiladi"})
    @Column({
        type: DataType.INTEGER,
    })
    districtId: number;

    @ApiProperty({example: "location", description:"location kiritiladi"})
    @Column({
        type: DataType.STRING,
    })
    location: string;

    @ApiProperty({example: "buildAT", description:"build(qurmoq) kiritiladi"})
    @Column({
        type: DataType.DATE,
    })
    buildAt: Date;

    @ApiProperty({example: "start_time", description:"boshlanish vaqti kiritiladi"})
    @Column({
        type: DataType.DATE,
    })
    start_time: Date;

    @ApiProperty({example: "end_time", description:"tugash vaqti kiritiladi"})
    @Column({
        type: DataType.DATE,
    })
    end_time: Date;
}
