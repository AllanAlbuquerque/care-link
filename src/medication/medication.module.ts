import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';
import { Medication } from './entities/medication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([Medication]),
  ],
  controllers: [MedicationController],
  providers: [MedicationService, FhirService],
})
export class MedicationModule {}
