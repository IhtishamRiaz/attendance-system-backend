import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Student } from './student.model';
import { Class } from './class.model';

@Table({ tableName: 'attendance' })
export class Attendance extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'absent',
  })
  status: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  studentId: number;

  @ForeignKey(() => Class)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  classId: number;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Class)
  class: Class;
}
