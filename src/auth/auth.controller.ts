import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDTO } from './Mapper/auth-credentials.dto';
import { AuthService } from './auth.service';

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
}
