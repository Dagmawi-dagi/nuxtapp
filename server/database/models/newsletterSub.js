import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';
import Email from '~/server/utils/email';
import { createError } from 'h3';

const _schema = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type:  DataTypes.STRING, allowNull: false },
    email:{ type: DataTypes.STRING, allowNull: false, unique: true ,
        validate: {
            isEmail: true, 
        }
    },
    confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
    unsubscribe: { type: DataTypes.BOOLEAN, defaultValue: false },
}

const newsletterSub = sequelize.define('newsletterSub', _schema, {
  tableName: 'newsletterSubs',
  timestamps: true,
});

// here create zod validation schema form the reqBody for this model to be used before crud operations
const base = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
    
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
    
  confirmed: z.boolean()
    .optional()
    .default(false),
    
  unsubscribe: z.boolean()
    .optional()
    .default(false)
});

const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema = base.partial();
const subscribeSchema = base.pick({ name: true, email: true });
const unsubscribeSchema = z.object({ email: z.string().email("Valid email is required") });


// create associations
newsletterSub.associate = (models)=>{
    newsletterSub.belongsToMany(models.newsletter, {
      through: 'newsletter Successful Recipients', // Junction table name
      as: 'recieved Newsletters', // Alias for eager loading (when populating)
    });
}

newsletterSub.beforeFind('',function(options){
    options.include = options.include || [];
    options.include.push({
      association: 'recieved Newsletters', // Use the alias defined in your association
      through: { attributes: [] }, // Exclude junction table fields
    });
})

newsletterSub.afterCreate('', async function(model,options){
    const subscriber = model;
    // --------------------------------------------------------------------------------//
    try {
       await new Email().confirm_newsletterSub({
        email: subscriber.email,
        name: subscriber.name,
        frontEnd: `${process.env.FRONTENDURL}/newsletter-confirm/${subscriber.id}`,
        createdAt: subscriber.createdAt,
        })
    } catch (error) { 
        model.destroy({force:true})
       throw createError({
            statusCode: 400,
            statusMessage: `confirmation email failed. plaese try again later', ${ JSON.stringify(error) }`
          });
      }
})

export default {
  model: newsletterSub,
  schema : _schema,
  zobSchema: {base,full,updateSchema,subscribeSchema,unsubscribeSchema}
}