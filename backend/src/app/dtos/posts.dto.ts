import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;
}

export class LikePostParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postId: number;
}

export class CreatePostCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  comment: string;
}

export class GetPostCommentsParamsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  postId: number;
}
