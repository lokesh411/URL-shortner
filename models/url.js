const { url } = require('./connection');
const { Model, Sequelize } = require('sequelize');

class Url extends Model { };

// Url.sync().then(() => {
Url.init({
    originalUrl: Sequelize.STRING,
    shortUrl: { type: Sequelize.STRING, unique: true },
    createdAt: { type: Sequelize.DATE, default: Sequelize.NOW }
},
    {
        indexes: [{ unique: true, fields: ['shortUrl', 'originalUrl'] }], sequelize: url, modelName: 'urls'
    }
)

const getShortenURL = async (originalUrl) => {
    const result = await Url.findOne({ where: { originalUrl } })
    console.log('result ::: ', result)
    if (!result) {
        const record = await Url.create({
            originalUrl,
            shortUrl: Date.now()
        })
        return Promise.resolve(record.shortUrl)
    } else {
        return Promise.resolve(result.shortUrl)
    }
}

const getLongURL = shortUrl => {
    return Url.findOne({ where: { id: shortUrl } })
}

module.exports = {
    Url,
    getShortenURL,
    getLongURL
}