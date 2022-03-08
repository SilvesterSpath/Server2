const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const morgan = require('morgan');
const members = require('./Members');
const axios = require('axios');

const app = express();

app.use(morgan('dev')); // Log http requests and errors
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  const queryValue = req.query.value ?? 'default';
  const response = members.filter((item) => item.name.includes(queryValue));
  console.log(response);
  res.send(response);
});

app.get('/todo', async (req, res) => {
  try {
    const todo = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    if (Object.keys(todo.data).length != 0) {
      console.log('todo.data[0]:', typeof todo.data);
      res.status(200).send(todo.data);
    }
  } catch (error) {
    console.log(error.message);
    res.send('Error');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
