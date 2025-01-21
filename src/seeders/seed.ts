import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from '../models/class.model';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
import { Attendance } from 'src/models/attendance.model';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectModel(Class) private classModel: typeof Class,
    @InjectModel(Teacher) private teacherModel: typeof Teacher,
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(Attendance) private attendanceModel: typeof Attendance,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    await this.attendanceModel.destroy({ where: {} });
    await this.classModel.destroy({ where: {} });
    await this.teacherModel.destroy({ where: {} });
    await this.studentModel.destroy({ where: {} });

    const [class1, class2, class3] = await Promise.all([
      this.classModel.findOrCreate({ where: { name: 'Class 1' } }),
      this.classModel.findOrCreate({ where: { name: 'Class 2' } }),
      this.classModel.findOrCreate({ where: { name: 'Class 3' } }),
    ]);

    await this.teacherModel.bulkCreate(
      [
        { name: 'Teacher 1', classId: class1[0].id },
        { name: 'Teacher 2', classId: class2[0].id },
        { name: 'Teacher 3', classId: class3[0].id },
      ],
      { ignoreDuplicates: true },
    );

    for (let i = 1; i <= 30; i++) {
      const classId =
        i <= 10 ? class1[0].id : i <= 20 ? class2[0].id : class3[0].id;
      await this.studentModel.findOrCreate({
        where: { name: `Student ${i}`, classId },
      });
    }

    console.log('Seeding complete');
  }
}
