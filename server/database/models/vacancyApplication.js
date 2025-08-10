import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';


const _schema = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uploaded_files:{
      type: DataTypes.JSON,
      allowNull: false,
      arrayOfStrings: true,
      validate: {
        isArrayOfStrings(value) {
          if (!Array.isArray(value)) throw new Error('uploaded_files must be an array of strings');
        }
      },
    },
    application_form: { type:  DataTypes.TEXT, allowNull: false},
}

const vacancy_application = sequelize.define('vacancy_application', _schema, {
    tableName: 'vacancy_applications',
    timestamps: true,
});

const base = z.object({
  uploaded_files: z.array(
      z.string().url("Each file reference must be a valid URL")
    )
    .nonempty("At least one file must be uploaded")
    .max(5, "Maximum 5 files allowed")
    .refine(files => files.every(file => {
      const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
      return validExtensions.some(ext => file.toLowerCase().endsWith(ext));
    }, {
      message: "Files must be PDF, DOC, DOCX, or TXT format"
    })),
    
  application_form: z.string()
    .min(1, "Application form content is required")
    .min(50, "Application form must be at least 50 characters")
    .max(5000, "Application form too long (max 5000 characters)")
});

const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema = base.partial();


// add associations
vacancy_application.associate = function (models){
  vacancy_application.belongsTo(models.vacancy);
}

export default {
  model: vacancy_application,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
}