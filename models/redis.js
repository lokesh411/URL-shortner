const Redis = require('ioredis');;

const redis = new Redis({
    port: 6379,
    host: "127.0.0.1"
})

const redisGet = (key) => {
    return redis.get(key);
}

const redisSet = (key, value, expiry) => {
    redis.set(key, value, expiry || 86400)
}

const redisDel = (key) => {
    redis.del(key)
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