import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FhirService } from './fhir.service';
import { PatientModule } from './patient/patient.module';
import { HttpModule } from '@nestjs/axios';
import { PractitionerModule } from './practitioner/practitioner.module';
import { OrganizationModule } from './organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './app.entity';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Optional: Configure your timeout settings
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      database: 'CareLink',
      port: 1433,
      host: 'fhir-care-link.database.windows.net',
      username: 'fhiruser',
      password: 'CareLink23*',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Employee]),
    PatientModule,
    PractitionerModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, FhirService],
  exports: [FhirService],
})
export class AppModule {}
