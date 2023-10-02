import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([Patient]),
  ],
  controllers: [PatientController],
  providers: [PatientService, FhirService],
})
export class PatientModule {}
