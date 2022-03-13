'use strict';
const express = require('express');
const { user } = require('../models/index.js');
const routers = express.Router();
const bcrypt = require('bcrypt');

routers.post('/signup', async (req, res, next) => {
    let { username, password ,role } = req.body;
    try {
        
        let hashedPWD = await bcrypt.hash(password,5)
        const sendingNewUser = await user.create({
            username : username,
            password : hashedPWD,
            role:role
        }
        );
        res.status(201).json(sendingNewUser);
    } catch (error) {
        console.log(error);
        next('invalid signUp');
    }
});
module.exports = routers;