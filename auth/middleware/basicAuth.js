'use strict'
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { user } = require('../models/index');
const JWT = require('jsonwebtoken')
const SECRET = process.env.SECRET || "my secret";
const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [username, password] = decoded.split(':');

            const User = await user.findOne({ where: { username: username } });
            const PWD = await bcrypt.compare(password, User.password);
            if (PWD) {
                req.User = User // req ={user : user} 
                console.log(req.User);
                // generating the token
                let newToken = JWT.sign({username:User.username},SECRET,{expiresIn : 900000});//newToken 900000s ==15min
                User.token=newToken;
                res.status(200).json(User);
            } else {
                res.status(403).send('invalid login Password')
            }
        }} catch(error) {
            res.status(403).send('invalid login Username')
        }

    }

module.exports = basicAuth;