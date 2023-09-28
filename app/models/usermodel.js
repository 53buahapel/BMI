const Sequelize = require('sequelize');
const db = require('../config/database');

const user = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = user;