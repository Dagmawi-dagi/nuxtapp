import { DataTypes } from 'sequelize';
import  sequelize  from '@/server/database/sequelizeConnection';
import { z } from 'zod';


const _schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type:  DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  createdBy:{ type:  DataTypes.INTEGER, allowNull: true }, // allowNull: true since midllere ware will be if Just pass let Joi validator
  recipientsIds:{
    type: DataTypes.JSON,
    arrayOfNumbers: true,
    allowNull: false,
    validate: {
      isArrayOfAllowedValues(value) {
        if (!Array.isArray(value)) throw new Error('recipientsIds must be an array of Ids');
      }
    },
  },
}

const newsletter = sequelize.define('newsletter', _schema, {
  tableName: 'newsletters',
  timestamps: true,
});

const base = z.object({
  subject: z.string()
    .min(1, "Subject is required")
    .max(255, "Subject must be less than 255 characters"),
    
  content: z.string()
    .min(1, "Content is required")
    .min(10, "Content should be meaningful (at least 10 characters)"),
    
  createdBy: z.coerce.number()
    .int("Created by must be an integer")
    .positive("Created by must be positive")
    .optional()
    .nullable(),
    
  recipientsIds: z.array(
      z.coerce.number().int("Recipient ID must be an integer").positive("Recipient ID must be positive")
    )
    .nonempty("At least one recipient ID is required")
    .refine(ids => new Set(ids).size === ids.length, {
      message: "Recipient IDs must be unique"
    })
});

// Schema for COMPLETE records (including ID)
const full = base.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
 const updateSchema = base.partial();


// create associations
newsletter.associate = (models)=>{
  newsletter.belongsTo(models.user, { foreignKey: 'createdBy', targetKey: 'id' });
  // Recipients (many-to-many with newsletter_sub)
  newsletter.belongsToMany(models.newsletter_sub, {
    through: 'newsletter_recipients', // Junction table name
    as: 'recipients', // Alias for eager loading (when populating)
  });

  // Successful Recipients
  newsletter.belongsToMany(models.newsletter_sub, {
    through: 'newsletter_successful_recipients',
    as: 'successful_recipients', 
  });

  // Failed Recipients
  newsletter.belongsToMany(models.newsletter_sub, {
    through: 'newsletter_failed_recipients',
    as: 'failed_recipients',
  });
}


newsletter.beforeFind('',function(options){
  options.include = options.include || [];
  options.include.push(
    {
    association: 'recipients', // Use the alias defined in your association
    through: { attributes: [] }, // Exclude junction table fields
    },
    {
      association: 'successful_recipients', // Use the alias defined in your association
      through: { attributes: [] }, // Exclude junction table fields
    },
    {
      association: 'failed_recipients', // Use the alias defined in your association
      through: { attributes: [] }, // Exclude junction table fields
    },
  );
})

const successfulRecipients = [];
const failedRecipients = [];
// pre save middler ware to send newsletter to subscribers
newsletter.beforeCreate('', async function(model,options){
  try {
    // since the recipientsIds field is [ids] get the newsletter_sub docs 
    const { models } = sequelize;
    const recipients = await models.newsletter_sub.findAll({ where: { id: model.recipientsIds}});
    const newsletter = model;
    // --------------------------------------------------------------------------------//
    const email_sending_errors = []
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (!recipient.confirmed ) continue
      // send the email inside trycatch block
      try {
        await new Email().sendNewsletter({
            subject: newsletter.subject,
            email: recipient.email,
            name: recipient.name,
            frontEnd: process.env.FRONTENDURL,
            UnsubscribeLink: `${process.env.FRONTENDURL}/newsletter-unsub/${recipient.id}`,
            createdAt: newsletter.createdAt,
            content: newsletter.content
          })
        successfulRecipients.push(recipient.id); 
      } catch (error) { 
        email_sending_errors.push(error) 
        failedRecipients.push(recipient.id); 
      }
    }
    
    //----------------------------------------------------------------------------------------------------//
    // if we have at least 1 sent email the newsletter must be saved 
    if (email_sending_errors.length != 0 ) {
      throw new app_error_feedback(400, `email_sending_errors: ${ JSON.stringify(email_sending_errors) }`)
    }
  }
  catch (error) {
    throw new app_error_feedback(400,`${error}`)
  }
})

// // make sure to create the recipients
newsletter.afterCreate('', async function (model,options){ 
  const uniqueSuccessful = [...new Set(successfulRecipients)];
  const uniqueFailed = [...new Set(failedRecipients)];

  await model.addRecipients(model.recipientsIds);
  await model.addSuccessful_recipients(uniqueSuccessful);
  await model.addFailed_recipients(uniqueFailed);

})

export default {
  model: newsletter,
  schema : _schema,
  zobSchema: {base,full,updateSchema}
}
