// organization.entity.ts
import { Patient } from 'src/patient/entities/patient.entity';
import { Practitioner } from 'src/practitioner/entities/practitioner.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Patient, (patient) => patient.organizations)
  @JoinTable()
  patients: Patient[];

  @ManyToMany(() => Practitioner, (practitioner) => practitioner.organizations)
  @JoinTable()
  practitioners: Practitioner[];
}
