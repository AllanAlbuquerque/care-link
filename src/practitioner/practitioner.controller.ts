import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus, NotFoundException, ValidationPipe } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';

@Controller('practitioner')
export class PractitionerController {
  constructor(private readonly practitionerService: PractitionerService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createPractitionerDto: CreatePractitionerDto, @Res() res: Response) {
    try {
      const createdPractitioner = await this.practitionerService.create(createPractitionerDto);
      res.status(HttpStatus.CREATED).json(createdPractitioner);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const practitioners = await this.practitionerService.findAll();
      res.status(HttpStatus.OK).json(practitioners);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const practitioner = await this.practitionerService.findOne(id);
      if (!practitioner) {
        throw new NotFoundException(`Practitioner with ID ${id} not found`);
      }
      res.status(HttpStatus.OK).json(practitioner);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updatePractitionerDto: UpdatePractitionerDto, @Res() res: Response) {
    try {
      const message = await this.practitionerService.update(id, updatePractitionerDto);
      res.status(HttpStatus.OK).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const message = await this.practitionerService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
