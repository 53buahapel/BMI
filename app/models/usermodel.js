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
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    gender: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    bmi: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
}, {
    freezeTableName: true
});

module.exports = user;