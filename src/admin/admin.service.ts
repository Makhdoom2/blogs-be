import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private usersService: UsersService) {}

  listUsers(query: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isBlocked?: boolean;
  }) {
    return this.usersService.findAll(query);
  }

  toggleBlock(id: string) {
    return this.usersService.toggleBlock(id);
  }
}
