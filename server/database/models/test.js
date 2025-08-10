import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';

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

// here create zod validation schema form the reqBody for this model to be used before crud operations
const base = z.object({
  name: z.string()
    .min(1, "test Name is required")
    .max(255, "test Name must be less than 255 characters"),
  coverImg: z.string()
    .min(1, "test Cover image is required"),
  createdBy: z.coerce.number().int("test Created by must be an integer").positive("test Created by must be positive")
});

// Schema for COMPLETE records (including ID)
const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
// Schema for UPDATING records
 const updateSchema = base.partial();

export default {
  model: test,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
}