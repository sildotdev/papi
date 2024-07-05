const { Sequelize } = require('sequelize');

const createLocalDatabase = () => {
  return new Sequelize({
    dialect: 'sqlite',
    storage: 'fallback.db',
  });
};

const createPrimaryDatabase = () => {
  return new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
  });
};

const authenticateDatabase = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');
    return sequelize;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

const initializeDatabase = async () => {
  let sequelize;
  try {
    sequelize = createPrimaryDatabase();
    sequelize = await authenticateDatabase(sequelize);
  } catch {
    console.log('Falling back to local sqlite database...');
    sequelize = createLocalDatabase();
    sequelize = await authenticateDatabase(sequelize);
  }
  return sequelize;
};

module.exports = initializeDatabase();
