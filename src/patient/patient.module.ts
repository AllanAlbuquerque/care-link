import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Optional: Configure your timeout settings
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, FhirService],
})
export class PatientModule {}
