import { Injectable } from '@nestjs/common';
import type { FindOptions, Transaction } from 'sequelize';
import { Post } from '../../database/models/post.model.js';

export type CreatePostInput = {
  content: string;
  authorId: number;
};

export type UpdatePostFields = {
  content?: string;
  authorId?: number;
  likeCount?: number;
};

@Injectable()
export class PostsRepository {
  findAll(options?: FindOptions<Post>): Promise<Post[]> {
    return Post.findAll(options);
  }

  create(input: CreatePostInput, transaction?: Transaction): Promise<Post> {
    return Post.create(
      {
        content: input.content,
        authorId: input.authorId,
      },
      { transaction },
    );
  }

  async update(
    id: number,
    fields: UpdatePostFields,
    transaction?: Transaction,
  ): Promise<Post> {
    const [affectedCount] = await Post.update(fields, {
      where: { id },
      transaction,
    });
    if (affectedCount === 0) {
      throw new Error(`Post not found: ${id}`);
    }
    const post = await Post.findByPk(id, { transaction });
    if (!post) {
      throw new Error(`Post not found: ${id}`);
    }
    return post;
  }
}
