const express = require('express');
const router = express.Router();
const client = require('./db')
const bcrypt = require('bcrypt')
require('dotenv').config();

// test
router.get('/createtable', async(req,res) => {
    await client.query('DROP TABLE IF EXISTS users; CREATE TABLE users(id serial PRIMARY KEY, username VARCHAR(50), password VARCHAR(255), email VARCHAR(50), role VARCHAR(50));')
    res.send({ message: `table users in database ${process.env.PGDATABASE} created`})

})

module.exports = router;