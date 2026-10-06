import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'comments',
  timestamps: true,
  updatedAt: false,
})
export class Comment extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'post_id',
  })
  declare postId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'author_id',
  })
  declare authorId: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;
}
