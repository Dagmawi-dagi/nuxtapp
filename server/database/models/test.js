import { DataTypes } from 'sequelize';
import sequelize from '@/server/database/sequelizeConnection';

const schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
}

const test = sequelize.define('test', schema, {
  tableName: 'tests',
  timestamps: true,
});


export const model = test;
const _schema = schema;
export { _schema as schema };