const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Set up Sequelize with database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define a User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
});

// Connect to the database and synchronize models
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
    return sequelize.sync(); // Sync models with the database
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Root route
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Auth service running on port 3000');
});
