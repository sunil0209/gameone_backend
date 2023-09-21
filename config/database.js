// database.js
import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});


sequelize.authenticate().then(async () => {
    await sequelize.sync({
        force: false,
        alter: true,
    });
    console.log('Connection to the database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
export default sequelize;
