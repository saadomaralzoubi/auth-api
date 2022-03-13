'use strict';
const express = require ('express');
const routers = express.Router();
const bearerAuth = require('../middleware/bearerAuth');

routers.get('/secret',bearerAuth,(req,res)=>{
    res.status(200).send("Valid Token");
})



module.exports = routers;