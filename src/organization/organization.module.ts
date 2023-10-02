import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { FhirService } from 'src/fhir.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([Organization]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, FhirService, Organization],
})
export class OrganizationModule {}
