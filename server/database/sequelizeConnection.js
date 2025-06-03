import { Sequelize }  from 'sequelize'

 export const sequelize = new Sequelize( 'D_DALF' , 'root', '', {
  host: '127.0.0.1' , // or your database host IP/domain
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  port: 3306,       // Optional: Defaults are usually fine (e.g., 3306 for MySQL, 5432 for PostgreSQL)
  logging: false
});

// import { model as test } from './models/test'

// const models = {
//   test,
// };

// // Initialize associations
// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

// connect the DB on app start using  plugin