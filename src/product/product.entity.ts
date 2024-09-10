import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Categories } from 'src/categories/categories.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  @Exclude({ toPlainOnly: true }) //problem: getting all the user data such as the password
  //that is security breach
  //exclude package will exclude the user details, toPlainOnly means exclude the plain json text
  user: User;
  @ManyToOne(() => Categories, (categories) => categories.products, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  categories: Categories;
}
//also going to use interceptor, interceptor is a concept in nestJs in which you can modify or change a request, transform
