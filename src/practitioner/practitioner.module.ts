import { Module } from '@nestjs/common';
import { PractitionerService } from './practitioner.service';
import { PractitionerController } from './practitioner.controller';

@Module({
  controllers: [PractitionerController],
  providers: [PractitionerService],
})
export class PractitionerModule {}
