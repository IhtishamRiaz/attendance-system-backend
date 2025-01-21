import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { Student } from './student.model';

@Table
export class Class extends Model {
  @Column
  name: string;

  @HasMany(() => Teacher)
  teachers: Teacher[];

  @HasMany(() => Student)
  students: Student[];
}
