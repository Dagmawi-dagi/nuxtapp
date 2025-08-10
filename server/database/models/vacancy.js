import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';


const _schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  position_name: { type:  DataTypes.STRING, allowNull: false},
  description: { type:  DataTypes.STRING, allowNull: false},
  requirements: { type:  DataTypes.TEXT, allowNull: false},
  locations:{
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    validate: {
      isArrayOfStrings(value) {
        if (!Array.isArray(value)) throw new Error('locations must be an array of strings');
      }
    },
  },
  salary: { type:  DataTypes.STRING, allowNull: false},
  company: { type:  DataTypes.STRING, allowNull: false},
  deadline: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },

  createdBy:{ type:  DataTypes.INTEGER, allowNull: false},
}

const vacancy = sequelize.define('vacancy', _schema, {
  tableName: 'vacancies',
  timestamps: true,
});


const base = z.object({
  position_name: z.string()
    .min(1, "Job position name is required")
    .max(255, "Position name must be less than 255 characters"),

  description: z.string()
    .min(1, "Description is required"),

  requirements: z.string()
    .min(1, "Requirements are required"),

  locations: z.array(z.string())
    .nonempty("At least one location is required"),

  salary: z.string()
    .min(1, "Salary is required"),

  company: z.string()
    .min(1, "Company name is required"),

  deadline: z.coerce.date({
    invalid_type_error: "Deadline must be a valid date"
  }),

  createdBy: z.coerce.number()
    .int("Created by must be an integer")
    .positive("Created by must be a positive number"),
});

const full = base.extend({
  id: z.number()
    .int("ID must be an integer")
    .positive("ID must be a positive number")
});
const updateSchema = base.partial();

export { base, full, updateSchema };

// add association
vacancy.associate = function (models){
  vacancy.belongsTo(models.user,  { foreignKey: 'createdBy', targetKey: 'id',});
  vacancy.hasMany(models.vacancy_application);
}

export default {
  model: vacancy,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
}