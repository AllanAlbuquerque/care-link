import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';

@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

  @Post()
  create(@Body() createPractitionerDto: CreatePractitionerDto) {
    return this.practitionerService.create(createPractitionerDto);
  }

  @Get()
  findAll() {
    return this.practitionerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practitionerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePractitionerDto: UpdatePractitionerDto) {
    return this.practitionerService.update(+id, updatePractitionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practitionerService.remove(+id);
  }
}
