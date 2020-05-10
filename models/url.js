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
        indexes: [{ unique: true, fields: ['shortUrl, originalUrl'] }], sequelize: url, modelName: 'urls'
    }
)
// })

module.exports = {
    Url
}