import { Injectable } from '@nestjs/common';
import type { FindOptions, Transaction } from 'sequelize';
import { Comment } from '../../database/models/comment.model.js';

export type CreateCommentInput = {
  postId: number;
  content: string;
  authorId: number;
};

@Injectable()
export class CommentsRepository {
  findAll(options?: FindOptions<Comment>): Promise<Comment[]> {
    return Comment.findAll(options);
  }

  create(
    input: CreateCommentInput,
    transaction?: Transaction,
  ): Promise<Comment> {
    return Comment.create(
      {
        postId: input.postId,
        content: input.content,
        authorId: input.authorId,
      },
      { transaction },
    );
  }
}
