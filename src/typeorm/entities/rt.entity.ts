import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rt')
export class RT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: '' })
  email: string;

  @Column({ default: '' })
  rt: string;
}
