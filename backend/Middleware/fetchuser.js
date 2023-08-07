const jwt = require('jsonwebtoken');
let jwt_secret = 'goodgirl';

const fetchuser =  (req, res, next) =>
{
    // get user from jwt token and append id to request

    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).send({error :"enter valid credentials"});
    }

    try {
        const data = jwt.verify(token,jwt_secret);
        req.user = data.user;
        
    } catch (error) {
        return res.status(401).send({error :"enter valid credentials"});
    }

    next();

}



module.exports = fetchuser;