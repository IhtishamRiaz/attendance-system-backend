import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Class } from './class.model';
import { Attendance } from './attendance.model';

@Table
export class Student extends Model {
  @Column
  name: string;

  @ForeignKey(() => Class)
  @Column
  classId: number;

  @BelongsTo(() => Class)
  class: Class;

  @HasMany(() => Attendance)
  attendances: Attendance[];
}
