import { Injectable } from '@nestjs/common';
import type { FindOptions, Transaction } from 'sequelize';
import { UserFollowing } from '../../database/models/user-following.model.js';

export type CreateUserFollowingInput = {
  userId: number;
  followingUserId: number;
};

@Injectable()
export class UserFollowingsRepository {
  findAll(options?: FindOptions<UserFollowing>): Promise<UserFollowing[]> {
    return UserFollowing.findAll(options);
  }

  create(
    input: CreateUserFollowingInput,
    transaction?: Transaction,
  ): Promise<UserFollowing> {
    return UserFollowing.create(
      {
        userId: input.userId,
        followingUserId: input.followingUserId,
      },
      { transaction },
    );
  }
}
