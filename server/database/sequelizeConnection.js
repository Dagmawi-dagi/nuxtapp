import { Sequelize }  from 'sequelize'

const sequelize = new Sequelize('nuxtstarter', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

export default sequelize;