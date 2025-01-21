import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Class } from './class.model';

@Table
export class Teacher extends Model {
  @Column
  name: string;

  @ForeignKey(() => Class)
  @Column
  classId: number;

  @BelongsTo(() => Class)
  class: Class;
}

export default Teacher;
