import Sequelize from 'sequelize'; // Import Sequelize
import sequelize from '../../config/database.js'; // Import Sequelize instance

const User = sequelize.define('User', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

export default User;