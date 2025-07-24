import { DataTypes } from 'sequelize';
import { sequelize } from '@/server/database/sequelizeConnection';

const _schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true ,index: true},
  coverImg: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
}

const test = sequelize.define('test', _schema, {
  tableName: 'tests',
  timestamps: true,
});

test.searchColumns = ['name'];

export default {
  model: test,
  schema : _schema
}