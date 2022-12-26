const usersDB = {
    users:require('../db'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromise = require('fs').promises;
const path =require('path');

const handleLogin = async (req, res) =>{
    const {user,pwd} = req.body;
    if (!user || !pwd)return res.status(400).json({'message':'username & password are request'})
    const foundUser = usersDB.users.find(person.username === user);
    if(!foundUser)return res.sendStatus(401);
    
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        //jwt
        const accessToken = jwt.sign(
            {
                "username": foundUser.username,

            },
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: '45s'}

        );
        const refreshToken = jwt.sign(
            {
                "username": foundUser.username,

            },
            process.env.REFRESH_TOKEN_SECRET,{expiresIn: '1d'}

        );

        //saving refresh token
        const otherUSers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = {...foundUser, refreshToken};
        usersDB.setUsers([...otherUSers, currentUser]);
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
        res.json({accessToken});

    } else{
        res.sendStatus(401);
    }
} 


module.exports = { handleLogin};