import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    // if (user.role === 'admin') return true;

    const authorId = req.params.id || req.body.authorId;

    if (authorId !== user.sub) {
      throw new ForbiddenException('Not allowed');
    }

    return true;
  }
}
