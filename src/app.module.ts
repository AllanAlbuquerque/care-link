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
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 5000, // Optional: Configure your timeout settings
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'fhir-care-link.database.windows.net',
        port: 1433,
        database: 'CareLink',
        username: 'fhiruser',
        password: 'CareLink23*',
        synchronize: true, // For development only; consider setting to false in production
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
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
