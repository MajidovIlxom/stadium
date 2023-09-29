import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr{
    first_name: string;
    last_name: string;
    username: string;
    hashed_password: string;
    telegram_link: string;
    email: string;
    phone: string;
    user_photo: string;
    birthday: Date;
    is_owner: boolean;
    is_active: boolean;
    hashed_refresh_token: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttr>{
    @ApiProperty({example: 1, description: "serial ID"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({example: "firstname", description: "Foydalnuvchining ismi"})
    @Column({
        type: DataType.STRING,
    })
    first_name: string;
    
    @ApiProperty({example: "lastname", description: "Foydalnuvchining familyasi"})
    @Column({
        type: DataType.STRING,
    })
    last_name: string;
    
    @ApiProperty({example: "username", description: "Foydalnuvchining usernamei"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    username: string;

    @ApiProperty({example: "password", description: "Foydalnuvchining hashed_password"})
    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;


    @ApiProperty({example: "link", description: "Foydalnuvchining telegram_link"})
    @Column({
        type: DataType.STRING,
    })
    telegram_link: string;

    @ApiProperty({example: "email", description: "Foydalnuvchining email"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email: string;

    @ApiProperty({example: "phoneNumber", description: "Foydalnuvchining phonesi"})
    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @ApiProperty({example: "photo", description: "Foydalnuvchining user_photosi"})
    @Column({
        type: DataType.STRING,
    })
    user_photo: string;

    @ApiProperty({example: "date", description: "Foydalnuvchining to'g'ilgan kuni "})
    @Column({
        type: DataType.DATE,
    })
    birthday: Date;

    @ApiProperty({example: "false", description: "Foydalnuvchining is_owner"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_owner: boolean;

    @ApiProperty({example: "false", description: "Foydalnuvchining is_active"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @ApiProperty({example: "refresh_token", description: "Foydalnuvchining hashed_refresh_token"})
    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING,
    })
    activation_link: string
}

