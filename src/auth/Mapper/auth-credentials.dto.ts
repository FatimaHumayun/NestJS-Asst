import { IsString, MinLength } from '@nestjs/class-validator';
import { MaxLength } from 'class-validator';

export class AuthCredentialsDTO {
  //add validations here through decorators
  @IsString()
  @MinLength(3)
  @MaxLength(35)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}
