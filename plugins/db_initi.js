import { sequelize } from '@/server/database/sequelizeConnection'
// Register all models into a single object
// to init models associations
import modelsRefs from '@/server/database/models/modelsRefs';


export default defineNuxtPlugin(async () => {
  try {
    const models = {
      test: modelsRefs.test.model,
      user: modelsRefs.user.model,
      blog: modelsRefs.blog.model,
      newsletter: modelsRefs.newsletter.model,
      newsletterSub: modelsRefs.newsletterSub.model,
      vacancy: modelsRefs.vacancy.model,
      vacancyApplication: modelsRefs.vacancyApplication.model,
    };

    // Initialize associations
    Object.values(models).forEach(model => {
      if (model.associate) {
        model.associate(models);
      }
    });
    
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
    await sequelize.sync(); //  with options {force: true} it will delete and recreate the talbes  
    console.log('Database synced');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})