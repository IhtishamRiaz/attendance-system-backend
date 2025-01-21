import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from '../models/class.model';
import { Student } from '../models/student.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class) private readonly classModel: typeof Class,
    @InjectModel(Student) private readonly studentModel: typeof Student,
  ) {}

  async getAllClasses() {
    const classesWithCount = await this.classModel.findAll({
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('students.id')), 'studentCount'],
        ],
      },
      include: [
        {
          model: Student,
          attributes: [],
        },
      ],
      group: ['Class.id'],
    });

    return classesWithCount;
  }

  async getClassById(id: number) {
    return this.classModel.findOne({
      where: { id },
      include: [
        {
          model: Student,
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('students.id')), 'studentCount'],
        ],
      },
      group: ['Class.id', 'students.id'],
    });
  }

  async getStudentsOfClass(id: number) {
    return this.studentModel.findAll({ where: { classId: id } });
  }
}
