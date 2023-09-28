import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, FhirService],
})
export class OrganizationModule {}
