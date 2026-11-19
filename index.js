const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { general } = require('./router/general');
const { authenticated } = require('./router/auth_users');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace-this-development-secret';

app.use(express.json());
app.use('/customer', session({
  secret: process.env.SESSION_SECRET || 'fingerprint_customer',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' }
}));

app.use('/customer/auth', (req, res, next) => {
  const token = req.session?.authorization?.accessToken;
  if (!token) return res.status(403).json({ message: 'User not logged in' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'User not authenticated' });
    req.user = user;
    next();
  });
});

app.use('/customer', authenticated);
app.use('/', general);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
