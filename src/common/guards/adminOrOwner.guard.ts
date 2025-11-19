import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminOrOwnerGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    const authorId = req.params.id || req.body.authorId;

    if (user.role === 'admin') return true;
    if (authorId === user.sub) return true;

    throw new ForbiddenException('Not allowed');
  }
}
