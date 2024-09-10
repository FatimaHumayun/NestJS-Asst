import { Repository, EntityManager } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './Mapper/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }
  async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDto;

    //hash the user password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt); //2 things required

    // console.log('salt', salt);
    // console.log('hashed', hashedPassword);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //duplicate error code
        throw new ConflictException('User Already Exists!');
      } else {
        throw new InternalServerErrorException();
      }
      console.log(error.code);
    }
  }
}
