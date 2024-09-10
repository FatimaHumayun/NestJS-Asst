import { Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createProductCategories(): Promise<void> {
    return this.categoriesService.createProductCategories();
  }
}
