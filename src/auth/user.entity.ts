import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true }) //no duplicate usernames here
  username: string;
  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user, { eager: true }) //the type of relationship, how it is related to the other side
  products: Product[];
  //eager means whenever I fetch a user from the database I will always fetch the products details as well for that user
}
