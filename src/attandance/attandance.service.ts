import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from '../models/attendance.model';
import { Student } from '../models/student.model';
import { Op } from 'sequelize';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private readonly attendanceModel: typeof Attendance,
  ) {}

  async markAttendance(attendanceDto: {
    classId: number;
    date: string;
    presentStudentIds: number[];
  }) {
    const { classId, date, presentStudentIds } = attendanceDto;

    const studentsInClass = await Student.findAll({ where: { classId } });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    await this.attendanceModel.destroy({
      where: {
        classId,
        date: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    const attendanceRecords = studentsInClass.map((student) => {
      return {
        date,
        studentId: student.id,
        classId,
        status: presentStudentIds.includes(student.id) ? 'present' : 'absent',
      };
    });

    await this.attendanceModel.bulkCreate(attendanceRecords, {
      ignoreDuplicates: true,
    });

    return { message: 'Attendance marked successfully.' };
  }

  async getAttendanceByDayAndClass(date: string, classId: number) {
    console.log(
      '🚀 ~ AttendanceService ~ getAttendanceByDayAndClass ~ classId:',
      classId,
    );
    console.log(
      '🚀 ~ AttendanceService ~ getAttendanceByDayAndClass ~ date:',
      date,
    );

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.attendanceModel.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay, endOfDay],
        },
        classId,
      },
      attributes: ['studentId', 'status'],
    });
  }
}
