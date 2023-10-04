import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { FhirService } from 'src/fhir.service';
import { Practitioner } from './entities/practitioner.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';

@Injectable()
export class PractitionerService {
  constructor(
    @InjectRepository(Practitioner)
    private readonly practitionerRepository: Repository<Practitioner>,
    private readonly fhirService: FhirService,
  ) {}

  async create(createPractitionerDto: CreatePractitionerDto): Promise<any> {
    try {
      // Use the FhirService to create a practitioner in the Azure FHIR service.
      const newPractitioner = {
        ...new CreatePractitionerDto(), // Initialize with default values
        ...createPractitionerDto,
      };

      const organizations = newPractitioner.organizations;

      // Remove the organizations property from the newPractitioner object.
      delete newPractitioner.organizations;

      const createdPractitioner = await this.fhirService.createResource(
        'Practitioner',
        newPractitioner,
      );

      // Add the organizations to the practitioner.
      createdPractitioner.organization = organizations;     
      
      // Name is just the text
      createdPractitioner.name = createdPractitioner.name[0].text;

      const practitioner = plainToClass(Practitioner, createdPractitioner);
      console.log(practitioner);
      await this.practitionerRepository.save(practitioner);

      return createdPractitioner;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create practitioner.');
    }
  }

  async findAll(): Promise<any[]> {
    const practitioners = await this.practitionerRepository.find();
    return practitioners;
  }

  async findOne(id: string): Promise<any> {
    try {
      
      // Use the FhirService to retrieve a practitioner from the Azure FHIR service.
      const practitioner = await this.fhirService.getResource(
        'Practitioner',
        id,
      );
      if (!practitioner) {
        throw new NotFoundException(`Practitioner with ID ${id} not found`);
      }
      return practitioner;
    } catch (error) {
      throw new NotFoundException(`Practitioner with ID ${id} not found`);
    }
  }

  async update(
    id: string,
    updatePractitionerDto: UpdatePractitionerDto,
  ): Promise<string> {
    try {

      // Use the FhirService to create a practitioner in the Azure FHIR service.
      const newPractitioner = {
        ...new CreatePractitionerDto(), // Initialize with default values
        ...updatePractitionerDto,
      };
      const organizations = newPractitioner.organizations;

      // Remove the organizations property from the newPractitioner object.
      delete newPractitioner.organizations;

      // Use the FhirService to update a practitioner in the Azure FHIR service.
      const createdPractitioner = await this.fhirService.updateResource(
        'Practitioner',
        id,
        newPractitioner,
      );

      // Add the organizations to the practitioner.
      createdPractitioner.organization = organizations;     
     
      // Name is just the text
      createdPractitioner.name = createdPractitioner.name[0].text;
      console.log(createdPractitioner);

      //!CORRIGIR: EntityPropertyNotFoundError: Property "resourceType" was not found in "Practitioner". Make sure your query is correct.
      const practitioner = plainToClass(Practitioner, createdPractitioner);
      await this.practitionerRepository.update(id, practitioner);

      return `Practitioner #${id} updated successfully`;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to update Practitioner #${id}.`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      // Use the FhirService to delete a practitioner from the Azure FHIR service.
      await this.fhirService.deleteResource('Practitioner', id);
      await this.practitionerRepository.delete(id);
      return `Practitioner #${id} removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove Practitioner #${id}.`);
    }
  }
}
