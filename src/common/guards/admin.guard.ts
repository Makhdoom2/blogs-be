import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    // console.log('AdminGuard - User Role:', req.user);
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}
