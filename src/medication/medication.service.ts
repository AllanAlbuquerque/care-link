import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { FhirService } from 'src/fhir.service';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
    private readonly fhirService: FhirService,
  ) {}

  async create(createMedicationDto: CreateMedicationDto): Promise<any> {
    try {
      // Use the FhirService to create a medication in the Azure FHIR service.
      const newMedication = {
        ...new CreateMedicationDto(), // Initialize with default values
        ...createMedicationDto,
      };
      console.log(createMedicationDto);
      const createdMedication = await this.fhirService.createResource(
        'Medication',
        newMedication,
      );

      // Insert Medication into database
      const medication = plainToClass(Medication, createdMedication);
      await this.medicationRepository.save(medication);

      return createdMedication;
    } catch (error) {
      throw new Error('Failed to create medication.');
    }
  }

  async findAll(): Promise<any[]> {
    const medications = await this.medicationRepository.find();
    return medications;
  }

  async findOne(id: string): Promise<any> {
    try {
      // Use the FhirService to retrieve a medication from the Azure FHIR service.
      const medication = await this.fhirService.getResource('Medication', id);
      if (!medication) {
        throw new NotFoundException(`Medication with ID ${id} not found`);
      }
      return medication;
    } catch (error) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
  }

  async update(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<string> {
    try {
      // Use the FhirService to update a medication in the Azure FHIR service.
      await this.fhirService.updateResource('Medication', id, updateMedicationDto);
      return `Medication #${id} updated successfully`;
    } catch (error) {
      throw new Error(`Failed to update Medication #${id}.`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      // Use the FhirService to delete a medication from the Azure FHIR service.
      await this.fhirService.deleteResource('Medication', id);
      return `Medication #${id} removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove Medication #${id}.`);
    }
  }
}
