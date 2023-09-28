import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FhirService } from 'src/fhir.service';

@Injectable()
export class PatientService {
  constructor(private readonly fhirService: FhirService) {}

  async create(createPatientDto: CreatePatientDto): Promise<any> {
    try {
      // Use the FhirService to create a patient in the Azure FHIR service.
      const newPatient = {
        ...new CreatePatientDto(), // Initialize with default values
        ...createPatientDto,
      };
      console.log(createPatientDto)
      const createdPatient = await this.fhirService.createResource('Patient', newPatient);
      return createdPatient;
    } catch (error) {
      throw new Error('Failed to create patient.');
    }
  }

  async findAll(): Promise<any[]> {
    // You should implement logic to retrieve all patients from the FHIR service.
    // Replace the following line with an appropriate call to the FHIR service.
    return [];
  }

  async findOne(id: string): Promise<any> {
    try {
      // Use the FhirService to retrieve a patient from the Azure FHIR service.
      const patient = await this.fhirService.getResource('Patient', id);
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      return patient;
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<string> {
    try {
      // Use the FhirService to update a patient in the Azure FHIR service.
      await this.fhirService.updateResource('Patient', id, updatePatientDto);
      return `Patient #${id} updated successfully`;
    } catch (error) {
      throw new Error(`Failed to update Patient #${id}.`);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      // Use the FhirService to delete a patient from the Azure FHIR service.
      await this.fhirService.deleteResource('Patient', id);
      return `Patient #${id} removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove Patient #${id}.`);
    }
  }
}
