const { findUser } = require("../services/user-service")
let jwt = require('jsonwebtoken');
let config = require('./config');

function checkUser (request, response, next) {
    console.log(request.body);
    findUser(request.body.user,(error,data)=>{
        console.log('Result :',data);
        if (error) return response.status(400).json({err:JSON.stringify(error)})
        else if (data.length==0) return response.status(401).json({ 'error': 'No such user' });
        return next();
    });
}

function checkToken (request, response, next) {
    console.log(request.headers)
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.query.token// Express headers are auto converted to lowercase
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return response.redirect('/')
            } else {
                console.log('Token decoded : ',decoded);
                //Add topken payload to request
                request.decoded = decoded;
                request.user = decoded;
                next();
            }
        });
    } else {
        return response.status(401).json({ 'error': 'Auth token is not supplied' });
    }
}

function isTeacher (request, response, next) {
    if (request.decoded.role=='teacher') {
        next();
    } else {
        return response.status(401).json({
            success: false,
            message: 'Permittion error'
        });
    }
}

module.exports = {
    checkUser,
    checkToken,
    isTeacher
};