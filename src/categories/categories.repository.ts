import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesRepository extends Repository<Categories> {
  constructor(entityManager: EntityManager) {
    super(Categories, entityManager);
  }
}
//entity manager is to interact with the database = query something from the db
