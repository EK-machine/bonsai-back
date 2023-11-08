import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalTransformer } from '../transformers/decimal.transformer.js';

@Entity('soil')
export class Soil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  img_path: string;

  @Column({ default: false })
  in_stock: boolean;
}
