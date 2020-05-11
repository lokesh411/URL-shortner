const { url } = require('./connection');
const { Model, Sequelize } = require('sequelize');
const {urlShortner} = require('./shortner')

class Url extends Model { };

// Url.sync().then(() => {
Url.init({
    originalUrl: Sequelize.STRING,
    shortUrl: { type: Sequelize.STRING, unique: true },
    createdAt: { type: Sequelize.DATE, default: Sequelize.NOW }
},
    {
        indexes: [{ unique: true, fields: ['shortUrl, originalUrl'] }], sequelize: url, modelName: 'urls'
    }
)

const getShortenURL = (originalUrl) => {
    Url.findOne({ where: { originalUrl } }).then((result) => {
        if (!result) {

        } else {
            return Promise.resolve(result.shortUrl)
        }
    })
}

const getLongURL = shortUrl => {
    return Url.findOne({ where: { shortUrl } })
}
// })

module.exports = {
    Url,
    getShortenURL,
    getLongURL
}