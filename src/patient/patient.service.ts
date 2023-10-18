import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FhirService } from 'src/fhir.service';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly fhirService: FhirService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<any> {
    try {
      // Use the FhirService to create a patient in the Azure FHIR service.
      const newPatient = {
        ...new CreatePatientDto(), // Initialize with default values
        ...createPatientDto,
      };
      const createdPatient = await this.fhirService.createResource(
        'Patient',
        newPatient,
      );

      // Insert Patient into database
      const patient = plainToClass(Patient, createdPatient);
      const nameArray = Array.isArray(patient.name) ? patient.name : [patient.name];
      const givenName = nameArray[0].given ? nameArray[0].given[0] : '';
      const familyName = nameArray[0].family ? nameArray[0].family : '';
      patient.name = givenName + ' ' + familyName;
      console.log(patient);
      await this.patientRepository.save(patient);

      return createdPatient;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create patient.');
    }
  }

  async findAll(): Promise<any[]> {
    const patients = await this.patientRepository.find();
    return patients;
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

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<string> {
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
