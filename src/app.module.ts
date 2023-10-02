import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FhirService } from './fhir.service';
import { PatientModule } from './patient/patient.module';
import { HttpModule } from '@nestjs/axios';
import { PractitionerModule } from './practitioner/practitioner.module';
import { OrganizationModule } from './organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
    }),
    //test
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mssql',
        host: 'fhir-care-link.database.windows.net',
        port: 1433,
        database: 'CareLink',
        username: 'fhiruser',
        password: 'CareLink23*',
        synchronize: true,
        entities: ['dist/**/*.entity{.ts,.js}'],
        subscribers: ['dist/**/*.subscriber{.ts,.js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    PatientModule,
    PractitionerModule,
    OrganizationModule,
    MedicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, FhirService],
  exports: [FhirService],
})
export class AppModule {}
