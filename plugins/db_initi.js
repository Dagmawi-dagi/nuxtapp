import { sequelize } from '@/server/database/sequelizeConnection'

export default defineNuxtPlugin(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
    await sequelize.sync(); //  with options {force: true} it will delete and recreate the talbes  
    console.log('Database synced');
  } catch (error) {
    console.error('Database connection error:', error);
  }
})