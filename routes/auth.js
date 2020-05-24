const jwt = require('jsonwebtoken')
const { redisSet, redisGet } = require('../models/redis')

const verify = async (req, res, next) => {
    const token = req.headers['auth_token'] || req.cookies['auth_token']
    if (!token) return res.publish(false, 'Invalid auth', {}, 401)
    try {
        const key = `session:${token}`
        const user = await redisGet(`session:${token}`)
        if(!user) {
            throw new Error('user not authenticated')
        }
        const verified = jwt.verify(token, process.env.secretToken)
        req.user = JSON.parse(user)
        req.token = token;
        req.verified = verified;
        console.log('verified user')
        await redisSet(key, user, 900)
        next()
    } catch (err) {
        console.log('ERROR in verifying user ::: ', err)
        return res.publish(false, 'Dont try to fake me', {}, 401)
    }
}

module.exports = {
    verify
}