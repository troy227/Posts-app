import { Injectable } from '@nestjs/common';
import type { FindOptions, Transaction } from 'sequelize';
import { Like } from '../../database/models/like.model.js';

export type CreateLikeInput = {
  postId: number;
  userId: number;
};

@Injectable()
export class LikesRepository {
  findAll(options?: FindOptions<Like>): Promise<Like[]> {
    return Like.findAll(options);
  }

  create(input: CreateLikeInput, transaction?: Transaction): Promise<Like> {
    return Like.create(
      {
        postId: input.postId,
        userId: input.userId,
      },
      { transaction },
    );
  }
}
