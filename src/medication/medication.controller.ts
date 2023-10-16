import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, NotFoundException, ValidationPipe } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createMedicationDto: CreateMedicationDto, @Res() res: Response) {
    try {
      const createdMedication = await this.medicationService.create(createMedicationDto);
      res.status(HttpStatus.CREATED).json(createdMedication);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const medications = await this.medicationService.findAll();
      res.status(HttpStatus.OK).json(medications);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const medication = await this.medicationService.findOne(id);
      if (!medication) {
        throw new NotFoundException(`Medication with ID ${id} not found`);
      }
      res.status(HttpStatus.OK).json(medication);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateMedicationDto: UpdateMedicationDto, @Res() res: Response) {
    try {
      const message = await this.medicationService.update(id, updateMedicationDto);
      res.status(HttpStatus.OK).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const message = await this.medicationService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
