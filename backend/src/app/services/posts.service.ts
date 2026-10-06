import { BadRequestException, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import type { Post } from '../../database/models/post.model.js';
import type { CreatePostDto } from '../dtos/posts.dto.js';
import { PostsRepository } from '../repositories/posts.repository.js';
import { UserFollowingsRepository } from '../repositories/user-followings.repository.js';

const FEED_LIMIT = 10;

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly userFollowingsRepository: UserFollowingsRepository,
  ) {}

  createPost(authorId: number, dto: CreatePostDto): Promise<Post> {
    if (!Number.isInteger(authorId) || authorId < 1) {
      throw new BadRequestException('Invalid x-user-id');
    }

    return this.postsRepository.create({
      content: dto.content,
      authorId,
    });
  }

  async getFeed(userId: number): Promise<Post[]> {
    if (!Number.isInteger(userId) || userId < 1) {
      throw new BadRequestException('Invalid x-user-id');
    }

    const followings = await this.userFollowingsRepository.findAll({
      where: { userId },
      attributes: ['followingUserId'],
    });
    const authorIds = followings.map((row) => row.followingUserId);
    // if (authorIds.length === 0) {
    //   return [];
    // }

    return this.postsRepository.findAll({
      // where: { authorId: { [Op.in]: authorIds } },
      order: [['createdAt', 'DESC']],
      limit: FEED_LIMIT,
    });
  }
}
