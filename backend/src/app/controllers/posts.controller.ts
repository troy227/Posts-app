import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import type { Post as PostModel } from '../../database/models/post.model.js';
import { CreatePostDto } from '../dtos/posts.dto.js';
import { PostsService } from '../services/posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(
    @Headers('x-user-id') userId: string | undefined,
    @Body() body: CreatePostDto,
  ): Promise<PostModel> {
    return this.postsService.createPost(Number(userId), body);
  }

  @Get('feed')
  getFeed(
    @Headers('x-user-id') userId: string | undefined,
  ): Promise<PostModel[]> {
    return this.postsService.getFeed(Number(userId));
  }
}
