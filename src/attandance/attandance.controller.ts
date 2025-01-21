import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AttendanceService } from './attandance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('mark')
  async markAttendance(
    @Body()
    attendanceDto: {
      classId: number;
      date: string;
      presentStudentIds: number[];
    },
  ) {
    if (
      !attendanceDto.classId ||
      !attendanceDto.date ||
      !Array.isArray(attendanceDto.presentStudentIds)
    ) {
      throw new BadRequestException(
        'classId, date, and presentStudentIds are required.',
      );
    }

    return await this.attendanceService.markAttendance(attendanceDto);
  }

  @Get('by-day-and-class')
  async getAttendanceByDayAndClass(
    @Query('date') date: string,
    @Query('classId') classId: number,
  ) {
    if (!date || !classId) {
      throw new BadRequestException('Both date and classId are required');
    }

    return this.attendanceService.getAttendanceByDayAndClass(date, classId);
  }
}
