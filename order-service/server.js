const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// Set up Sequelize with database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define an Order model
const Order = sequelize.define('Order', {
  user_id: { type: DataTypes.STRING, allowNull: false },
  product_id: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
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
  res.send('Order Service is running');
});

// Orders endpoint
app.post('/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send('Order placed');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Error placing order');
  }
});

// Start the server
app.listen(3002, () => {
  console.log('Order service running on port 3002');
});
