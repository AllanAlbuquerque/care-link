import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Response } from 'express';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto, @Res() res: Response) {
    try {
      const createdPatient = await this.patientService.create(createPatientDto);
      res.status(HttpStatus.CREATED).json(createdPatient);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const patients = await this.patientService.findAll();
      res.status(HttpStatus.OK).json(patients);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const patient = await this.patientService.findOne(id);
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      res.status(HttpStatus.OK).json(patient);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Res() res: Response) {
    try {
      const message = await this.patientService.update(id, updatePatientDto);
      res.status(HttpStatus.OK).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const message = await this.patientService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
