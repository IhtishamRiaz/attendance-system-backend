import { Module } from '@nestjs/common';
import { AttendanceService } from './attandance.service';
import { AttendanceController } from './attandance.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from '../models/attendance.model';

@Module({
  imports: [SequelizeModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttandanceModule {}
