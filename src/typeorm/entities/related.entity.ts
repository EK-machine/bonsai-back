import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('showrelated')
export class Related {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  show_instrument: boolean;

  @Column({ default: false })
  show_pot: boolean;

  @Column({ default: false })
  show_soil: boolean;
}
