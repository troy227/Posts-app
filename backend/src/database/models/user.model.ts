import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  updatedAt: false,
})
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;
}
