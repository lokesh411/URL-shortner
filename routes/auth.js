const jwt = require('jsonwebtoken')


const verify = (req, res, next) => {
    const token = req.headers['auth_token'] || req.cookies['auth_token']
    if (!token) return res.status(401).publish(false, 'Invalid auth')
    try {
        const verified = jwt.verify(token, process.env.secretToken)
        req.user = verified
        console.log('verified used')
        next()
    } catch (err) {
        return res.status(401).publish(false, 'Dont try to fake me')
    }
}

module.exports = {
    verify
}