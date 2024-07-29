import fs from 'node:fs/promises';
import path from 'node:path'; // Import path module
import express from 'express';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

const app = express();
const router = express.Router();

// Directory where your data files are located
const dataDir = path.resolve(__dirname, '../data');

app.use(bodyParser.json());
app.use(express.static('public'));

// Set CORS headers
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define GET /meals route
router.get('/meals', async (req, res) => {
  try {
    const filePath = path.resolve(dataDir, 'available-meals.json');
    const meals = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error('Error reading meals data:', error);
    res.status(500).json({ message: 'Failed to read meals data: ' + error.message });
  }
});

// Define POST /orders route
router.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  if (
    !orderData.customer.email ||
    !orderData.customer.email.includes('@') ||
    !orderData.customer.name?.trim() ||
    !orderData.customer.street?.trim() ||
    !orderData.customer['postal-code']?.trim() ||
    !orderData.customer.city?.trim()
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code, or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: Math.floor(Math.random() * 1000).toString(),
  };

  try {
   // const ordersFilePath = path.resolve(dataDir, 'orders.json');
    // let orders = [];
    // try {
    //   const ordersData = await fs.readFile(ordersFilePath, 'utf8');
    //   orders = JSON.parse(ordersData);
    // } catch (readError) {
    //   if (readError.code === 'ENOENT') {
    //     // File doesn't exist yet
    //     orders = [];
    //   } else {
    //     throw readError;
    //   }
    // }
    // orders.push(newOrder);
   // await fs.writeFile(ordersFilePath, JSON.stringify(orders));
    res.status(201).json({ orderId: newOrder.id, message: 'Order created!' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Failed to process order: ' + error.message });
  }
});

// Use router with base path
app.use('/.netlify/functions/api', router);

// Export the handler
export const handler = serverless(app);
