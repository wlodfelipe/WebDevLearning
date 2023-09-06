const Sequelize = require('sequelize');
const db = require('./db');


const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

//criar uma tabela se não tiver
User.sync();

module.exports = User;
