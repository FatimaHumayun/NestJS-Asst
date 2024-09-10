import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { Categories } from './categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
