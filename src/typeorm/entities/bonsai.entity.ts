import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalTransformer } from '../transformers/decimal.transformer.js';

@Entity({ name: 'bonsai' })
export class Bonsai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'бонсай' })
  name: string;

  @Column({
    name: 'price',
    type: 'decimal',
    precision: 5,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
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
