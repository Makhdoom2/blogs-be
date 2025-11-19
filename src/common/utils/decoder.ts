import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwt: JwtService) {}

  decode(token: string) {
    const decoded = this.jwt.decode(token);

    if (!decoded || typeof decoded !== 'object') {
      return null;
    }

    return {
      issuedAt: decoded['iat'],
      expiresAt: decoded['exp'],
      subject: decoded['sub'],
      role: decoded['role'],
      raw: decoded,
    };
  }
}
