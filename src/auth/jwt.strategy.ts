import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'mango123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this.userRepository = new UserRepository(this.dataSource.manager);
  }
  //we already know that the token is valid
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload; //extract the username from the database
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    //user doesn't exist
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  //taking the user from the payload, we know it's valid. Taking the username from that payload and storing it in user
}
