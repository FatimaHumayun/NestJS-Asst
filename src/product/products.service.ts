import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDTO } from './DTO/create-product-dto';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

//import { v4 as uuid } from 'uuid';
//import { CreateUserDTO } from './DTO/create-user-dto';
@Injectable()
export class ProductsService {
  private readonly productRepository: ProductRepository;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.productRepository = new ProductRepository(this.dataSource.manager);
  }
  //Get Products by ID
  async getProductsById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found!`);
    }
    return found;
  }
  //CREATE A PRODUCT
  createProduct(
    createProductDTO: CreateProductDTO,
    user: User,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDTO, user);
  }
  //DELETE A PRODUCT
  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found!`);
    }
    console.log(result);
  }
  //UPDATE A PRODUCT INFO
  async udpateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const product = await this.getProductsById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    product.name = name;
    product.description = description;
    product.price = price;
    await this.productRepository.save(product);
    return product;
  }
  //GET ALL PRODUCTS
  async getAllProducts(): Promise<Product[]> {
    const found = await this.productRepository.find();
    return found;
  }
  //GET PRODUCTS BY USER ID
  async getUserProductsById(id: string): Promise<Product[]> {
    const userProduct = await this.productRepository.find({
      where: { user: { id } },
      relations: ['user'],
    });
    return userProduct;
  }
  //GET PRODUCTS BY CATEGORY ID
  async getCategoryProductsById(id: string): Promise<Product[]> {
    const categoryProduct = await this.productRepository.find({
      where: { categories: { id } },
      relations: ['categories'],
    });
    return categoryProduct;
  }
}
