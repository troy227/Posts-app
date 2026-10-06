import { Controller, Headers, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { LikePostParamsDto } from '../dtos/posts.dto.js';
import { LikesService } from '../services/likes.service.js';

@Controller('posts')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId/like')
  @HttpCode(HttpStatus.NO_CONTENT)
  likePost(
    @Headers('x-user-id') userId: string | undefined,
    @Param() params: LikePostParamsDto,
  ): Promise<void> {
    return this.likesService.likePost(Number(userId), params.postId);
  }
}
