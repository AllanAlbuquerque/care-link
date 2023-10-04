import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { FhirService } from 'src/fhir.service';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly fhirService: FhirService,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<any> {
    try {
      // Use the FhirService to create a organization in the Azure FHIR service.
      const newOrganization = {
        ...new CreateOrganizationDto(), // Initialize with default values
        ...createOrganizationDto,
      };
      console.log(createOrganizationDto);
      const createdOrganization = await this.fhirService.createResource(
        'Organization',
        newOrganization,
      );

      // Insert Organization into database
      const organization = plainToClass(Organization, createdOrganization);
      await this.organizationRepository.save(organization);

      return createdOrganization;
    } catch (error) {
      throw new Error('Failed to create organization.');
    }
  }

  async findAll(): Promise<any[]> {
    const organizations = await this.organizationRepository.find();
    return organizations;
  }

  async findOne(id: string): Promise<any> {
    try {
      // Use the FhirService to retrieve a organization from the Azure FHIR service.
      const organization = await this.fhirService.getResource(
        'Organization',
        id,
      );
      if (!organization) {
        throw new NotFoundException(`Organization with ID ${id} not found`);
      }
      return organization;
    } catch (error) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<string> {
    try {
      // Use the FhirService to update a organization in the Azure FHIR service.
      await this.fhirService.updateResource(
        'Organization',
        id,
        updateOrganizationDto,
      );
      return `Organization #${id} updated successfully`;
    } catch (error) {
      throw new Error(`Failed to update Organization #${id}.`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      // Use the FhirService to delete a organization from the Azure FHIR service.
      await this.fhirService.deleteResource('Organization', id);
      await this.organizationRepository.delete(id);
      return `Organization #${id} removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove Organization #${id}.`);
    }
  }
}
