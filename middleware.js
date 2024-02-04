
const jwt = require('jsonwebtoken');

let isLoggedIn = (req , res , next) => {
    let token = req.cookies.token;
    jwt.verify(token , process.env.SECRET_KEY , (err , userData) => {
        if (err) {
            return res.json({msg : 'Please Login First'});
        }
        else if (userData) {
            req.user = JSON.parse(userData.user);
            next();
        }
    })
}

module.exports = isLoggedIn;