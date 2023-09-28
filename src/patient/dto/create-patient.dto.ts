export class CreatePatientDto {
  resourceType: string = 'Patient';
  active?: boolean;
  name?: {
    given: string[];
    family?: string;
    prefix?: string[];
    suffix?: string[];
  }[];
  gender?: string;
  birthDate?: string;
  address?: {
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }[];
  telecom?: {
    system?: string;
    value?: string;
    use?: string;
  }[];
  identifier?: {
    system?: string;
    value?: string;
  }[];
}
