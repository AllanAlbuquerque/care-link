import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, ValidationPipe } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createOrganizationDto: CreateOrganizationDto, @Res() res: Response) {
    try {
      const createdOrganization = await this.organizationService.create(createOrganizationDto);
      res.status(HttpStatus.CREATED).json(createdOrganization);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const organizations = await this.organizationService.findAll();
      res.status(HttpStatus.OK).json(organizations);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const organization = await this.organizationService.findOne(id);
      if (!organization) {
        throw new NotFoundException(`Organization with ID ${id} not found`);
      }
      res.status(HttpStatus.OK).json(organization);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateOrganizationDto: UpdateOrganizationDto, @Res() res: Response) {
    try {
      const message = await this.organizationService.update(id, updateOrganizationDto);
      res.status(HttpStatus.OK).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const message = await this.organizationService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send(message);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
