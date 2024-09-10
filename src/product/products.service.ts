import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  async getProductsById(id: string, user: User): Promise<Product> {
    try {
      const found = await this.productRepository.findOne({
        where: { id, user },
      });
      if (!found) {
        throw new NotFoundException('Not Authorized to Access!');
      }
      return found;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.log(error);
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }
  //CREATE A PRODUCT
  async createProduct(
    createProductDto: CreateProductDTO,
    user: User,
  ): Promise<Product> {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const product = await this.productRepository.createProduct(
            createProductDto,
            user,
            transactionalEntityManager,
          );
          return product;
        },
      );
    } catch (error) {
      console.log('Creation Error', error);
      throw new InternalServerErrorException(error);
    }
  }
  //DELETE A PRODUCT
  async deleteProduct(id: string, user: User): Promise<void> {
    try {
      const result = await this.productRepository.delete({ id, user });
      //if deletion affected any rows
      if (result.affected === 0) {
        throw new NotFoundException('Not authorized to delete this product');
      }
      console.log('Deleted Product', result);
    } catch (error) {
      //this will check if the error  type is an instance of notfoundexcep(404 aye ga agar huwa tu)
      if (error instanceof NotFoundException) {
        throw error;
      }
      //koi unknown error
      else {
        throw new InternalServerErrorException('An unexpected error occurred'); //500 res
      }
    }
  }
  //UPDATE A PRODUCT INFO
  async udpateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    user: User,
    //categoryId: string,
  ): Promise<Product> {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const product = await transactionalEntityManager.findOne(Product, {
            where: { id, user },
          });
          if (!product) {
            throw new NotFoundException('Not Authorized to Access!');
          }
          product.name = name;
          product.description = description;
          product.price = price;
          //product.categories = categoryId;
          await this.productRepository.save(product);
          return product;
        },
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update product'); //500
      }
    }
  }

  //GET ALL PRODUCTS
  async getAllProducts(): Promise<Product[]> {
    try {
      const found = await this.productRepository.find();
      return found;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.log(error);
      throw new InternalServerErrorException('Unable to fetch products');
    }
  }
  //GET PRODUCTS BY USER ID
  async getUserProductsById(id: string, user: User): Promise<Product[]> {
    try {
      if (id !== user.id) {
        throw new NotFoundException('Not Authorized to Access');
      }
      const userProduct = await this.productRepository.find({
        where: { user: { id } },
        relations: ['user'],
      });
      return userProduct;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.log('Fetching error', error);
      throw new InternalServerErrorException('Failed to fetch product'); //500
    }
  }

  //GET PRODUCTS BY CATEGORY ID
  async getCategoryProductsById(id: string): Promise<Product[]> {
    try {
      const categoryProduct = await this.productRepository.find({
        where: { categories: { id } },
        relations: ['categories'],
      });
      return categoryProduct;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log('category id error', error);
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }
}
