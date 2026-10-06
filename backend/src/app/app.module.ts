import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller.js';
import { CommentsController } from './controllers/comments.controller.js';
import { LikesController } from './controllers/likes.controller.js';
import { PostsController } from './controllers/posts.controller.js';
import { AppService } from './services/app.service.js';
import { CommentsService } from './services/comments.service.js';
import { LikesService } from './services/likes.service.js';
import { PostsService } from './services/posts.service.js';
import { CommentsRepository } from './repositories/comments.repository.js';
import { LikesRepository } from './repositories/likes.repository.js';
import { PostsRepository } from './repositories/posts.repository.js';
import { UserFollowingsRepository } from './repositories/user-followings.repository.js';
import { UsersRepository } from './repositories/users.repository.js';

@Module({
  imports: [],
  controllers: [
    AppController,
    PostsController,
    LikesController,
    CommentsController,
  ],
  providers: [
    AppService,
    PostsRepository,
    LikesRepository,
    CommentsRepository,
    UsersRepository,
    UserFollowingsRepository,
    PostsService,
    LikesService,
    CommentsService,
  ],
})
export class AppModule {}
