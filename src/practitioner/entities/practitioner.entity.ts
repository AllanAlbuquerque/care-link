// practitioner.entity.ts
import { Organization } from 'src/organization/entities/organization.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Practitioner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Organization, (organization) => organization.practitioners)
  @JoinTable()
  organizations: Organization[];
}
