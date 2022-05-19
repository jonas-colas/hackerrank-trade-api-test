// const express = require('express');
const express = require('express');
const router = express.Router();

const { store, read, getOne, update, edit, destroy } = require('../controllers/trades');


router.post('/trades', store);
router.get('/trades', read);
router.get('/trades/:id', getOne);
router.put('/trades/:id', update);
router.patch('/trades/:id', edit);
router.delete('/trades/:id', destroy);

module.exports = router;
