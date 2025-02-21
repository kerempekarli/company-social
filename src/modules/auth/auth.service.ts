// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Kullanıcı kayıt işlemi
   */
  async register(registerDto: RegisterAuthDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Şifrenin hash’lenmesi userService içinde de olabilir. Tercihinize kalmış.
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return newUser;
  }

  /**
   * Kullanıcı giriş işlemi
   */
  async login(loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Kullanıcı doğrulandı, token oluştur
    const payload = { sub: user.user_id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  /**
   * LocalStrategy tarafından çağrılacak doğrulama metodu
   */
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return user;
  }
}
