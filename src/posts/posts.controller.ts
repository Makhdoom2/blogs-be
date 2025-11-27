import {
  Controller,
  Get,
  Query,
  Param,
  Post as PostMethod,
  Put,
  Delete,
  Body,
  UseGuards,
  UsePipes,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreatePostDto, UpdatePostDto } from './schemas/post.dto';
import type { CreatePostDtoType, UpdatePostDtoType } from './schemas/post.dto';
import { AdminOrOwnerGuard } from 'src/common/guards/adminOrOwner.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtOptionalGuard } from 'src/common/guards/jwtOption.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  @UseGuards(JwtOptionalGuard)
  getAll(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    // console.log('GetAll - User:', req);
    const isAdmin = req.user?.role === 'admin';

    // console.log('isAdmin:', isAdmin);
    return this.postsService.getAll({
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      search,
      isAdmin,
    });
  }

  @UseGuards(JwtOptionalGuard)
  @Get(':id')
  getOne(@Req() req: any, @Param('id') id: string) {
    const isAdmin = req.user?.role === 'admin';

    return this.postsService.getOne(isAdmin, id);
  }

  @UseGuards(JwtGuard)
  @PostMethod()
  // @UsePipes(new ZodValidationPipe(CreatePostDto))
  create(
    @GetUser() user,
    @Body(new ZodValidationPipe(CreatePostDto)) dto: CreatePostDtoType,
  ) {
    return this.postsService.create(user.sub, dto);
  }

  @UseGuards(JwtGuard, AdminOrOwnerGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdatePostDto)) dto: UpdatePostDtoType,
  ) {
    return this.postsService.update(id, dto);
  }

  @UseGuards(JwtGuard, AdminOrOwnerGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Put(':id/publish')
  togglePublish(@Param('id') id: string) {
    return this.postsService.togglePublish(id);
  }
}
