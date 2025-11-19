import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUtil } from '../utils/decoder';

@Injectable()
export class JwtOptionalGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private JwtUtil: JwtUtil,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      //   console.log('Token:', token);
      try {
        const decoded = this.JwtUtil.decode(token);

        // console.log('Decoded Token:', decoded);
        req.user = decoded;
      } catch (err) {
        req.user = null;
      }
    }

    return true;
  }
}
