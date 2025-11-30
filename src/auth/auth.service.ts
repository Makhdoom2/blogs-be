import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, comparePassword } from '../common/utils/hash.util';
import { JwtUtil } from '../common/utils/decoder';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private JwtUtil: JwtUtil,
  ) {}

  async register(dto) {
    const data = { ...dto };

    const email = data.email.toLowerCase();

    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new UnauthorizedException('Email already exists');

    const passwordHash = await hashPassword(dto.password);
    // console.log('dto in auth service', ...dto, passwordHash, email);
    const user = await this.usersService.create({
      name: dto.name,
      email: email,
      passwordHash,
      role: dto.role ?? 'user',
    });

    return user;
  }

  async login(dto) {
    const email = dto.email.toLowerCase();

    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await comparePassword(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (user.isBlocked) {
      throw new UnauthorizedException(
        'Your account has been blocked by admin.',
      );
    }
    // console.log('test 1 for role', user.role);
    const token = await this.jwt.signAsync({
      sub: user._id,
      role: user.role,
    });

    const decoded = this.JwtUtil.decode(token);

    return {
      token,
      expiresAt: decoded?.expiresAt,
      expiresIn: decoded?.expiresAt - decoded?.issuedAt,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    // return { token };
  }
}
