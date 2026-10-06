import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user_followings',
  timestamps: false,
})
export class UserFollowing extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'user_id',
  })
  declare userId: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: 'following_user_id',
  })
  declare followingUserId: number;
}
