import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
