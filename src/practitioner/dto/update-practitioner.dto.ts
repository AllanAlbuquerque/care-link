import { PartialType } from '@nestjs/mapped-types';
import { CreatePractitionerDto } from './create-practitioner.dto';

export class UpdatePractitionerDto extends PartialType(CreatePractitionerDto) {}
