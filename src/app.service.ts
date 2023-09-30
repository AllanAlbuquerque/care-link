import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  getHello(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }
}
