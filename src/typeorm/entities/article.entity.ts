import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  img_path: string;
}
