const Redis = require('ioredis');

const redis = new Redis({
    port: 6379,
    host: process.env.REDIS_URL
})

const redisGet = (key) => {
    return redis.get(key);
}

const redisSet = (key, value, expiry) => {
    return redis.set(key, value,'EX', expiry || 86400)
}

const redisDel = (key) => {
    return redis.del(key)
}

redis.on('connect', () => {
    console.debug('Redis connected successfully!!')
})

redis.on('error', (err) => {
    console.error('ERROR in connecting to redis::: ', err)
})

module.exports = {
    redisGet,
    redisSet,
    redisDel
}