import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDTO } from './DTO/create-product-dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
//import { CreateUserDTO } from './DTO/create-user-dto';

@Controller('products')
@UseGuards(AuthGuard('jwt')) //protect the entire route here
export class ProductController {
  constructor(private productService: ProductsService) {}

  //GET PRODUCT BY ID HERE
  @Get('/:id')
  getProductById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.getProductsById(id, user);
  }
  //CREATE PRODUCT HERE
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDTO,
    @GetUser() user: User,
  ): Promise<Product> {
    console.log('Received DTO:', createProductDto);
    return this.productService.createProduct(createProductDto, user);
  }
  @Delete('/:id')
  deleteProduct(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id, user);
  }
  //returning void here won't cause an error
  @Patch('/:id')
  updateProduct(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Promise<Product> {
    return this.productService.udpateProduct(
      id,
      name,
      description,
      price,
      user,
    );
  }
  //get all products
  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
  //get user products
  @Get('/user/:id')
  getUserProductsById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productService.getUserProductsById(id, user);
  }
  //get category products
  @Get('/category/:id')
  getCategoryProductsById(@Param('id') id: string): Promise<Product[]> {
    return this.productService.getCategoryProductsById(id);
  }
}
