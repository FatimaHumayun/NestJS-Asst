import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthCredentialsDTO } from './Mapper/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Product } from 'src/product/product.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //USER SIGN UP METHOD
  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
  @Post('/signIn')
  signIn(
    @Body() authcredentialDto: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authcredentialDto);
  }
  @Get('/user/products/:id')
  getProductsByUser(@Param('id') id: string): Promise<Product[]> {
    return this.authService.getProductsByUser(id);
  }
}
