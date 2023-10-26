import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bonsai' })
export class Bonsai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'бонсай' })
  name: string;

  @Column({ default: 0.0 })
  price: number;

  @Column({ nullable: true })
  descr: string;

  @Column({ nullable: true })
  img_path_1: string;

  @Column({ nullable: true })
  img_path_2: string;

  @Column({ nullable: true })
  img_path_3: string;

  @Column({ default: 'хвойные' })
  category: string;

  @Column({ nullable: true, default: 'новичок' })
  level: string;

  @Column({ default: false })
  in_stock: boolean;
}
