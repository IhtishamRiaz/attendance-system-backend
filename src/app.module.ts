import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederService } from './seeders/seed';
import { Class } from './models/class.model';
import { Teacher } from './models/teacher.model';
import { Student } from './models/student.model';
import { AttandanceModule } from './attandance/attandance.module';
import { Attendance } from './models/attendance.model';
import { ClassModule } from './class/class.module';
import { Sequelize } from 'sequelize-typescript';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'attandence',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Class, Teacher, Student, Attendance]),
    ClassModule,
    AttandanceModule,
  ],
  providers: [SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.sync();
  }
}
