import { Injectable } from '@nestjs/common';
import type { FindOptions, Transaction } from 'sequelize';
import { User } from '../../database/models/user.model.js';

export type CreateUserInput = {
  email: string;
};

@Injectable()
export class UsersRepository {
  findAll(options?: FindOptions<User>): Promise<User[]> {
    return User.findAll(options);
  }

  create(input: CreateUserInput, transaction?: Transaction): Promise<User> {
    return User.create({ email: input.email }, { transaction });
  }
}
