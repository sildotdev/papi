const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('tickets', {
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
        fine: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        expiration: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}