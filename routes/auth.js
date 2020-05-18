const jwt = require('jsonwebtoken')
const {redisGet, redisSet} = ('../models/redis')


const verify = async (req, res, next) => {
    const token = req.headers['auth_token'] || req.cookies['auth_token']
    if (!token) return res.status(401).publish(false, 'Invalid auth')
    try {
        const key = `session:${token}`
        const user = await redisGet(`session:${token}`)
        const verified = jwt.verify(token, process.env.secretToken)
        req.user = user
        req.token = token;
        req.verified = verified;
        console.log('verified user')
        redisSet(key, JSON.parse(user), 900)
        next()
    } catch (err) {
        console.log('ERROR in verifying user ::: ', err)
        return res.status(401).publish(false, 'Dont try to fake me')
    }
}

module.exports = {
    verify
}