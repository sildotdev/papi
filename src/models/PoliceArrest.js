const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('arrests', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        character_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        officer_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}