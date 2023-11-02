import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  descr: string;

  @Column()
  img_path: string;
}
