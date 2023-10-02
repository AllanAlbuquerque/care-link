import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID } from 'class-validator';
import { Organization } from 'src/organization/entities/organization.entity';

export class CreatePractitionerDto {
  @IsString()
  @IsNotEmpty()
  readonly resourceType: string = 'Practitioner';

  @IsArray()
  @IsOptional()
  readonly name?: string[];

  @IsArray()
  @IsOptional()
  readonly identifier?: string[];

  @IsArray()
  @IsOptional()
  readonly telecom?: string[];

  @IsString()
  @IsOptional()
  readonly gender?: string;

  @IsArray()
  @IsOptional()
  readonly qualification?: string[];

  @IsString()
  @IsOptional()
  readonly speciality?: string;

  @IsArray()
  @IsOptional()
  readonly address?: string[];

  @IsArray()
  @IsOptional()
  readonly organizations?: Organization[];
}
