import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/Models/user.models';
import { CategoriesModule } from './categories/categories.module';
import { ComfortModule } from './comfort/comfort.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { Category } from './categories/Models/category.models';
import { Comfort } from './comfort/Models/comfort.models';
import { ComfortStadium } from './comfort_stadium/Models/comfort_stadium.models';
import { District } from './district/Models/district.models';
import { Region } from './region/Models/region.models';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    ServeStaticModule.forRoot({rootPath: resolve(__dirname, 'static')}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.POSTGREST_HOST,
      port:Number(process.env.POSTGREST_PORT),
      username: process.env.POSTGREST_USER,
      password: String(process.env.POSTGREST_PASSWORD),
      database: process.env.POSTGREST_DB,
      models:[
        User,
        Category,
        Comfort,
        ComfortStadium,
        District,
        Region,
      ],
      autoLoadModels: true,
      logging: false,  
    }),
    UserModule,
    CategoriesModule,
    ComfortModule,
    ComfortStadiumModule,
    RegionModule,
    DistrictModule,
    StadiumsModule,
    MailModule,
    AdminModule,
    FilesModule,

  ],
})
export class AppModule {}
