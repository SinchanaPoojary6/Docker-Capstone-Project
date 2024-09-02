const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Set up Sequelize with database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define a Payment model
const Payment = sequelize.define('Payment', {
  order_id: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
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
  res.send('Payment Service is running');
});

// Payments endpoint
app.post('/payments', async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).send('Payment processed');
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Error processing payment');
  }
});

// Start the server
app.listen(3003, () => {
  console.log('Payment service running on port 3003');
});
