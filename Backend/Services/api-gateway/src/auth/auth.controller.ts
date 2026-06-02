import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { messages } from 'src/messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /auth/SignIn
  @Post('SignIn')
  signIn(@Body() signInDto: { email: string; password: string }) {
    if (!signInDto) {
      return { message: 'Invalid sign-in data', status: 400 };
    }
    const signInUser = this.authService.signIn(signInDto);
    return signInUser;
  }

  // auth/ligin
  @Post('login')
  login(@Body() loginDto: { email: string; password: string }) {
    const loginUser = this.authService.login(loginDto);
    return loginUser;
  }

  // auth/user

  @Get('user')
  getUser(@Req() req: any) {
    if (req.user) {
      return this.authService.getUserById(req.user.userId);
    } else {
      return { message: messages.UserNotFound, status: 401 };
    }
  }
}
