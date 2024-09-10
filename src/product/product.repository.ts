/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository, EntityManager, getRepository } from 'typeorm';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './DTO/create-product-dto';
import { User } from 'src/auth/user.entity';
import { Categories } from 'src/categories/categories.entity';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(entityManager: EntityManager) {
    super(Product, entityManager);
  }
  async createProduct(
    createProductDTO: CreateProductDTO,
    user: User,
  ): Promise<Product> {
    const { name, description, price, categories } = createProductDTO;
    const category = await this.manager.findOne(Categories, {
      where: { id: categories },
    });
    const product = this.create({
      name,
      description,
      price,
      user,
      categories: category,
    });
    await this.save(product);
    return product;
  }
}
