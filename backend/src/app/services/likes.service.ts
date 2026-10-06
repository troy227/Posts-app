import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getSequelize } from '../../database/db.js';
import { LikesRepository } from '../repositories/likes.repository.js';
import { PostsRepository } from '../repositories/posts.repository.js';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postsRepository: PostsRepository,
  ) {}

  async likePost(userId: number, postId: number): Promise<void> {
    if (!Number.isInteger(userId) || userId < 1) {
      throw new BadRequestException('Invalid x-user-id');
    }
    if (!Number.isInteger(postId) || postId < 1) {
      throw new BadRequestException('Invalid post id');
    }

    await getSequelize().transaction(async (transaction) => {
      const existing = await this.likesRepository.findAll({
        where: { postId, userId },
        limit: 1,
        transaction,
      });
      if (existing.length > 0) {
        return;
      }

      const posts = await this.postsRepository.findAll({
        where: { id: postId },
        limit: 1,
        transaction,
      });
      if (posts.length === 0) {
        throw new NotFoundException('Post not found');
      }

      await this.likesRepository.create({ postId, userId }, transaction);
      const post = posts[0];
      await this.postsRepository.update(
        postId,
        { likeCount: post.likeCount + 1 },
        transaction,
      );
    });
  }
}
