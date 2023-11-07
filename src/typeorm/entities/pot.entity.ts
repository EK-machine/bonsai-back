import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalTransformer } from '../transformers/decimal.transformer.js';

@Entity('pot')
export class Pot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  shape: string;

  @Column()
  color: string;

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

  @Column()
  img_path: string;

  @Column({ default: false })
  in_stock: boolean;
}
