import { Exclude } from 'class-transformer';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.categories, { eager: true })
  @Exclude({ toPlainOnly: true })
  products: Product[];
}
