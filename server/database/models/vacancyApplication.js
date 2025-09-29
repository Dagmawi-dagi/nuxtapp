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
    application_form: { type:  DataTypes.JSON, allowNull: false},
}

const vacancyApplication = sequelize.define('vacancyApplication', _schema, {
    tableName: 'vacancyApplications',
    timestamps: true,
});

const base = z.object({
  uploaded_files: z.array(z.string()) // multiple files
    .nonempty("At least one file must be uploaded")
    .max(5, "Maximum 5 files allowed")
    .refine(files => files.every(file => {
      const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
      return validExtensions.some(ext => file.toLowerCase().endsWith(ext));
    }, {
      message: "Files must be PDF, DOC, DOCX, or TXT format"
    })),
    
  // application_form: z.object()
});

const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema = base.partial();


// add associations
vacancyApplication.associate = function (models){
  vacancyApplication.belongsTo(models.vacancy);
}

export default {
  model: vacancyApplication,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
}