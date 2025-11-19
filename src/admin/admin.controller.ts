import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtGuard, AdminGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  users(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('isBlocked') isBlocked?: string,
  ) {
    const blocked =
      isBlocked === undefined ? undefined : isBlocked === 'true' ? true : false;

    return this.adminService.listUsers({
      page,
      limit,
      search,
      role,
      isBlocked: blocked,
    });
  }

  @Patch('users/:id/permission')
  block(@Param('id') id: string) {
    return this.adminService.toggleBlock(id);
  }
}
