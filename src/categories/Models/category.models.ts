import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType } from "sequelize-typescript";

interface CategoryCreationAttrs {
    name: string;
    parentId: number;
}

@Table({tableName: "categories"})
export class Category extends Model<Category, CategoryCreationAttrs> {
    @ApiProperty({example: 1, description: "ID serial"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: "Category", description: "Category name"})
    @Column({
        type: DataType.STRING,
    })
    name: string;
    
    @ApiProperty({example: "Category", description: "Category ID"})
    @Column({
        type: DataType.INTEGER,
    })
    parentId: number;

    
}
