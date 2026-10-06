import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'likes',
  timestamps: false,
})
export class Like extends Model {
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
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: number;
}
