import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthCredentialsDTO } from './Mapper/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Product } from 'src/product/product.entity';

//import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly userRepository: UserRepository;

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = new UserRepository(this.dataSource.manager);
  }
  //service handles business logic, so signup is a business usecase
  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signIn(
    authCredentialDto: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } }); //check if the user exists or not
    if (user && (await bcrypt.compare(password, user.password))) {
      //check if the hashed password and the passowrd in the db are the same
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your log-in credentials');
    }
  }
  //get user products here
  async getProductsByUser(id: string): Promise<Product[]> {
    const userProducts = await this.userRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    return userProducts.products; //userProducts is of type User,since i'm in user Repository, return type is expected to be Product array, thus need to access the products from there
  }
}
