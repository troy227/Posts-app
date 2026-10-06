import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import type { Comment } from '../../database/models/comment.model.js';
import {
  CreatePostCommentDto,
  GetPostCommentsParamsDto,
} from '../dtos/posts.dto.js';
import { CommentsService } from '../services/comments.service.js';

@Controller('posts')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId/comment')
  @HttpCode(HttpStatus.CREATED)
  createComment(
    @Headers('x-user-id') userId: string | undefined,
    @Param() params: GetPostCommentsParamsDto,
    @Body() body: CreatePostCommentDto,
  ): Promise<Comment> {
    return this.commentsService.createComment(
      Number(userId),
      params.postId,
      body,
    );
  }

  @Get(':postId/comments')
  getComments(
    @Param() params: GetPostCommentsParamsDto,
  ): Promise<Comment[]> {
    return this.commentsService.getComments(params);
  }
}
