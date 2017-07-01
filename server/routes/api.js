const express = require('express');
const router = express.Router();

// controllers
var auth = require('../controllers/AuthController');


// --> API ROUTE LIST
router.get('/', (req, res) => {
  res.send('api works');
});

// [AUTH ROUTES]
router.post('/auth/register', auth.create);
router.post('/auth/login', auth.login);

// --> END API ROUTE LIST

module.exports = router;