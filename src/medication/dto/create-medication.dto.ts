import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID } from 'class-validator';
export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  readonly resourceType: string = 'Medication';

  @IsString()
  @IsOptional()
  readonly code?: string;
}
