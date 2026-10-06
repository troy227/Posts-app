import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'posts',
  timestamps: true,
  updatedAt: false,
})
export class Post extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    field: 'like_count',
  })
  declare likeCount: number;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;
}
