import { Module } from '@nestjs/common';
import { ProductModule } from './product/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/product.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/categories.entity';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'e-commerce',
      autoLoadEntities: true,
      entities: [Product, Categories],
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
  ],
})
export class AppModule {}
//database configuration here
