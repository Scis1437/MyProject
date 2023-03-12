const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
     // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            console.info(decoded.UserInfo)
            req.roles = decoded.UserInfo.role;
            next();
        }
    );
}

module.exports = verifyJWT
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();


// const verifyJWT = (req ,res, next) =>{
//     const authHeader = req.headers['authorization'];
//     if(!authHeader) return res.sendStatus(401);
//     console.log(authHeader);
//     const token = authHeader.split(' ')[1];
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if(err) return res.sendStatus(403);
//             req.user = decoded,username;
//             next();
//         }
//     )
// }

// module.exports = verifyJWT