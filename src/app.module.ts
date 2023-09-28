import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FhirService } from './fhir.service';
import { PatientModule } from './patient/patient.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Optional: Configure your timeout settings
    }),
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService, FhirService],
  exports: [FhirService],
})
export class AppModule {}
