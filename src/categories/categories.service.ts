import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriesService {
  private readonly categoriesRepository: CategoriesRepository;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.categoriesRepository = new CategoriesRepository(
      this.dataSource.manager,
    );
  }
  async createProductCategories() {
    const categories = [
      { name: 'Hardware' },
      { name: 'Electronics' },
      { name: 'Makeup' },
      { name: 'Clothing' },
    ];
    //check  that only unique category is added
    for (const category of categories) {
      const currentCategory = await this.categoriesRepository.findOne({
        where: { name: category.name },
      });
      if (!currentCategory) {
        await this.categoriesRepository.save(category);
      }
    }
  }
}
