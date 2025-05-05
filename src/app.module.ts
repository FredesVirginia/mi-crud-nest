import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppService } from './app.service';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type : 'postgres',
      host:'localhost',
      port:5432,
      username : 'postgres',
      password:'jarry',
      database:'nestdb',
      entities : [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : true
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
