import { Controller, Get, Param } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Get(':id')
  getClassById(@Param('id') id: number) {
    return this.classService.getClassById(id);
  }

  @Get(':id/students')
  getStudentsOfClass(@Param('id') id: number) {
    return this.classService.getStudentsOfClass(id);
  }
}
