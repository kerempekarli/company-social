// src/modules/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // "Authorization: Bearer <token>"
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
    });
  }

  async validate(payload: any) {
    // Token doğrulandıktan sonra Passport otomatik olarak bu metodu çağırır
    // ve return edilen değer request içindeki req.user’a set edilir.
    // payload = { sub: user.user_id, email: user.email, iat, exp }
    return { user_id: payload.sub, email: payload.email };
  }
}
