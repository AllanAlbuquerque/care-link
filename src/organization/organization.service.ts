import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { FhirService } from 'src/fhir.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly fhirService: FhirService) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<any> {
    try {
      // Use the FhirService to create a organization in the Azure FHIR service.
      const newOrganization = {
        ...new CreateOrganizationDto(), // Initialize with default values
        ...createOrganizationDto,
      };
      console.log(createOrganizationDto)
      const createdOrganization = await this.fhirService.createResource('Organization', newOrganization);
      return createdOrganization;
    } catch (error) {
      throw new Error('Failed to create organization.');
    }
  }

  async findAll(): Promise<any[]> {
    // You should implement logic to retrieve all organizations from the FHIR service.
    // Replace the following line with an appropriate call to the FHIR service.
    return [];
  }

  async findOne(id: string): Promise<any> {
    try {
      // Use the FhirService to retrieve a organization from the Azure FHIR service.
      const organization = await this.fhirService.getResource('Organization', id);
      if (!organization) {
        throw new NotFoundException(`Organization with ID ${id} not found`);
      }
      return organization;
    } catch (error) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<string> {
    try {
      // Use the FhirService to update a organization in the Azure FHIR service.
      await this.fhirService.updateResource('Organization', id, updateOrganizationDto);
      return `Organization #${id} updated successfully`;
    } catch (error) {
      throw new Error(`Failed to update Organization #${id}.`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      // Use the FhirService to delete a organization from the Azure FHIR service.
      await this.fhirService.deleteResource('Organization', id);
      return `Organization #${id} removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove Organization #${id}.`);
    }
  }
}
