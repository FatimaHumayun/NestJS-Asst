import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule], //inject a dependency
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductModule {}
//forfeature is used to define which repositories are available in the current module
