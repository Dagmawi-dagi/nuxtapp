import { Sequelize }  from 'sequelize'

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT,
    logging: false,
  }
);

export default sequelize;
