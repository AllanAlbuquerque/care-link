import { Injectable } from '@nestjs/common';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';

@Injectable()
export class PractitionerService {
  create(createPractitionerDto: CreatePractitionerDto) {
    return 'This action adds a new practitioner';
  }

  findAll() {
    return `This action returns all practitioner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} practitioner`;
  }

  update(id: number, updatePractitionerDto: UpdatePractitionerDto) {
    return `This action updates a #${id} practitioner`;
  }

  remove(id: number) {
    return `This action removes a #${id} practitioner`;
  }
}
