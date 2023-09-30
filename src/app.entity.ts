import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('Employee') // Specify the entity name explicitly
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  EmployeeID!: number;

  @Column({ type: 'nvarchar', length: 50 })
  FirstName!: string;

  @Column({ type: 'nvarchar', length: 50 })
  LastName!: string;

  @Column({ type: 'nvarchar', length: 100 })
  Email!: string;

  @Column({ type: 'date' })
  Birthdate!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Salary!: number;

  @Column({ type: 'bit', default: 1 })
  IsActive!: boolean;
}
