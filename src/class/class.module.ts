import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from '../models/class.model';
import { Student } from '../models/student.model';
@Module({
  imports: [SequelizeModule.forFeature([Class, Student])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
