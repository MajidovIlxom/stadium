import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface AdminCreationAttrs{
    username: string;
    email: string;
    telegram_link: string;
    admin_photo: string;
    hashed_password: string;
    is_active: boolean;
    is_created: boolean;
    hashed_refresh_token: string;
}

@Table({tableName: "admin"})
export class Admin extends Model<Admin, AdminCreationAttrs>{
    @ApiProperty({example: 1, description: "Id serial number"})
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({example: "username", description: "Admin username"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    username: string;

    @ApiProperty({example: "email", description: "Admin email"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email: string;

    @ApiProperty({example: "telegram link", description: "Admin  telegram link"})
    @Column({
        type: DataType.STRING,
    })
    telegram_link: string;

    @ApiProperty({example: "admin_photo", description: "Admin  photo"})
    @Column({
        type: DataType.STRING,
    })
    admin_photo: string;

    @ApiProperty({example: "hashed_password", description: "Admin  hashed_password"})
    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;


    @ApiProperty({example: "is_active", description: "Admin  is_active"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;
    
    @ApiProperty({example: "is_created", description: "Admin  is_created"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_created: boolean;

    @ApiProperty({example: "hashed_refresh_token", description: "Admin  hashed_refresh_token"})
    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;
}
