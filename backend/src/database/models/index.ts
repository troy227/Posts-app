import { Comment } from './comment.model.js';
import { Like } from './like.model.js';
import { Post } from './post.model.js';
import { UserFollowing } from './user-following.model.js';
import { User } from './user.model.js';

export const sequelizeModels = [Post, Like, Comment, User, UserFollowing];
