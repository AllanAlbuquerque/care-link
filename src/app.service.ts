import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEndpoints(): string {
    return 'Endpoints: medication, patient, practitioner, organization';
  }
}
