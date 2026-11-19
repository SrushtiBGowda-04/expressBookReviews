const express = require('express');
const jwt = require('jsonwebtoken');
const { books } = require('./booksdb');

const authenticated = express.Router();
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-development-secret';

authenticated.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: 'username and password are required' });
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  return res.status(201).json({ message: 'User successfully registered. Now you can login.' });
});

authenticated.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(item => item.username === username && item.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  const accessToken = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  req.session.authorization = { accessToken, username };
  return res.json({ message: 'User successfully logged in', username });
});

authenticated.put('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const { review } = req.body || {};
  if (!review) return res.status(400).json({ message: 'review is required' });
  book.reviews[req.user.username] = review;
  return res.json({ message: 'Review added/updated successfully', reviews: book.reviews });
});

authenticated.delete('/auth/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (!book.reviews[req.user.username]) {
    return res.status(404).json({ message: 'No review found for this user' });
  }
  delete book.reviews[req.user.username];
  return res.json({ message: 'Review deleted successfully', reviews: book.reviews });
});

module.exports = { authenticated };
