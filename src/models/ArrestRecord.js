const initializeDatabase = require('../services/db');
const { DataTypes } = require('sequelize');

initializeDatabase.then(sequelize => {
  const ArrestRecord = sequelize.define('ArrestRecord', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    suspectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrestDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    offense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrestingOfficer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Sync the model with the database
  sequelize.sync();

  module.exports = ArrestRecord;
}).catch(err => {
  console.error('Failed to initialize the database:', err);
});
