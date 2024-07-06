const initializeDatabase = require('../services/db');
const { DataTypes } = require('sequelize');

const defineArrestRecord = async () => {
  const sequelize = await initializeDatabase;
  const ArrestRecord = sequelize.define('ArrestRecord', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    arrestTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    suspectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    suspectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    officerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Sync the model with the database
  await sequelize.sync();

  return ArrestRecord;
};

module.exports = defineArrestRecord;