// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Kullanıcı kaydı (Register)
   * POST /auth/register
   */
  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Kullanıcı girişi (Login)
   * POST /auth/login
   * LocalStrategy -> email + password doğrular
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginAuthDto) {
    // LocalStrategy doğrulaması başarılıysa req.user dolu gelir
    return this.authService.login(loginDto);
  }
}
