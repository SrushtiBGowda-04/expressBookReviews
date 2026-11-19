const express = require('express');
const axios = require('axios');
const { books } = require('./booksdb');

const general = express.Router();
const BASE_URL = `http://127.0.0.1:${process.env.PORT || 5000}`;

general.get('/', (_req, res) => res.json(books));
general.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});
general.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const matches = Object.values(books).filter(b => b.author.toLowerCase() === author);
  return res.json(matches);
});
general.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const matches = Object.values(books).filter(b => b.title.toLowerCase() === title);
  return res.json(matches);
});
general.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.json(book.reviews) : res.status(404).json({ message: 'Book not found' });
});

// Axios-based asynchronous versions required by the project task.
general.get('/async', async (_req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve books', error: error.message });
  }
});
general.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${encodeURIComponent(req.params.isbn)}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});
general.get('/async/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(req.params.author)}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});
general.get('/async/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(req.params.title)}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});
general.get('/async/review/:isbn', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/review/${encodeURIComponent(req.params.isbn)}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

module.exports = { general };
