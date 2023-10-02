import { Module } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerController } from './practitioner.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practitioner } from './entities/practitioner.entity';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([Practitioner]),
    OrganizationModule,
  ],
  controllers: [PractitionerController],
  providers: [PractitionerService, FhirService],
})
export class PractitionerModule {}
