import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto, RegisterDto } from './schemas/auth.dto';
import type { LoginDtoType, RegisterDtoType } from './schemas/auth.dto';

import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterDto))
  register(@Body() body: RegisterDtoType) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginDto))
  login(@Body() body: LoginDtoType) {
    return this.authService.login(body);
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out' };
  }
}
