import { IsBoolean, IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';

class IdentifierDTO {
  @IsString()
  system: string;

  @IsString()
  value: string;
}

class CodeableConceptDTO {
  @IsString()
  coding: string;

  @IsString()
  text: string;
}

class ContactDetailDTO {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  telecom: string[];
}

class PeriodDTO {
  @IsString()
  start: string;

  @IsString()
  end: string;
}

class ReferenceDTO {
  @IsString()
  reference: string;
}

class QualificationDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  identifier?: IdentifierDTO[];

  @ValidateNested()
  @IsOptional()
  code?: CodeableConceptDTO;

  @ValidateNested()
  @IsOptional()
  period?: PeriodDTO;

  @ValidateNested()
  @IsOptional()
  issuer?: ReferenceDTO;
}

export class CreateOrganizationDto {
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  identifier?: IdentifierDTO[];

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  type?: CodeableConceptDTO[];

  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  alias?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  contact?: ContactDetailDTO[];

  @ValidateNested()
  @IsOptional()
  partOf?: ReferenceDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  endpoint?: ReferenceDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  qualification?: QualificationDTO[];
}
