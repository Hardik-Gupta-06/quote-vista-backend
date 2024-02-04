const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isLoggedIn = require('../middleware');
const Quotes = require('../models/Quote');
const { showAllQuotes, showMyQuotes, createQuote, showQuote, editQuote, deleteQuote, likeQuote, unlikeQuote } = require('../controllers/quoteRoutes');

router.get('/allquotes' , showAllQuotes);

router.get('/myquotes' , isLoggedIn , showMyQuotes);

router.post('/addQuotes' , isLoggedIn , createQuote);

router.get('/quotes/:id' , showQuote);

router.patch('/quotes/:id/edit' , isLoggedIn , editQuote);

router.delete('/quotes/:id' , isLoggedIn , deleteQuote);

// likes
router.patch('/like/:id' , isLoggedIn , likeQuote);

router.patch('/unlike/:id' , isLoggedIn , unlikeQuote);

module.exports = router;