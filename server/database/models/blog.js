import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';

const _schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type:  DataTypes.STRING, allowNull: false,index:true},
  content_short: { type:  DataTypes.STRING, allowNull: false,index:true},
  content: { type:  DataTypes.TEXT, allowNull: false},
  coverImg: { type:  DataTypes.STRING, allowNull: false},
  category:{
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    allowed: ['info', 'news','social','event'],
    validate: {
      isArrayOfAllowedValues(value) {
        const allowed = ['info', 'news', 'social', 'event'];
        if (!Array.isArray(value)) throw new Error('Category must be an array of strings');
        for (const v of value) {
          if (!allowed.includes(v)) throw new Error(`Invalid value: ${v}`);
        }
      }
    },
  },
  createdBy:{ type:  DataTypes.INTEGER, allowNull: false}, // to pass the joi validation
}

const blog = sequelize.define('blog', _schema, {
  tableName: 'blogs',
  timestamps: true,
  paranoid: true,     // enables soft delete by adding deletedAt
});

blog.searchColumns = ['title','content_short','content'];


// Define allowed categories
const ALLOWED_CATEGORIES = ['info', 'news', 'social', 'event']
const base = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
    
  content_short: z.string()
    .min(1, "Short content is required")
    .max(500, "Short content must be less than 500 characters"),
    
  content: z.string()
    .min(1, "Content is required")
    .min(10, "Content should be meaningful (at least 10 characters)"),
    
  coverImg: z.string()
    .min(1, "Cover image is required")
    .nonempty("blog cover image is required"),
    
  category: z.array(
      z.enum(ALLOWED_CATEGORIES, {
        errorMap: (issue) => ({
          message: `Invalid category: ${issue.received}. Allowed: ${ALLOWED_CATEGORIES.join(', ')}`
        })
      })
    )
    .nonempty("At least one category is required")
    .max(3, "Maximum 3 categories allowed"),
    
  // Corrected createdBy field with coercion
  createdBy: z.coerce.number()
    .int("Created by must be an integer")
    .positive("Created by must be positive")
    .optional()
});


// CRUD Operation Specific Schemas
const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
// Schema for UPDATING records
 const updateSchema = base.partial();


//---------- create our relationships--------------//

blog.associate = function (models){
  blog.belongsTo(models.user,  { foreignKey: 'createdBy', targetKey: 'id',});
}


export default {
  model: blog,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
};