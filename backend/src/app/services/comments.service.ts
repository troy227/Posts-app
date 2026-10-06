import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Comment } from '../../database/models/comment.model.js';
import type {
  CreatePostCommentDto,
  GetPostCommentsParamsDto,
} from '../dtos/posts.dto.js';
import { CommentsRepository } from '../repositories/comments.repository.js';
import { PostsRepository } from '../repositories/posts.repository.js';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async createComment(
    authorId: number,
    postId: number,
    dto: CreatePostCommentDto,
  ): Promise<Comment> {
    if (!Number.isInteger(authorId) || authorId < 1) {
      throw new BadRequestException('Invalid x-user-id');
    }
    if (!Number.isInteger(postId) || postId < 1) {
      throw new BadRequestException('Invalid post id');
    }

    const posts = await this.postsRepository.findAll({
      where: { id: postId },
      limit: 1,
    });
    if (posts.length === 0) {
      throw new NotFoundException('Post not found');
    }

    return this.commentsRepository.create({
      postId,
      content: dto.comment,
      authorId,
    });
  }

  getComments(params: GetPostCommentsParamsDto): Promise<Comment[]> {
    return this.commentsRepository.findAll({
      where: { postId: params.postId },
      order: [['createdAt', 'ASC']],
    });
  }
}
