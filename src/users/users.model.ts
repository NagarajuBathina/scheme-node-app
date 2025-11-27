// src/users/users.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Users extends Model {
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare address_line1: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare status: boolean;
}
