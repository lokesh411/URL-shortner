const Sequelize = require('sequelize');

const user = new Sequelize('shorten_urls', 'root', '', {
    host: process.env.SQL_URL,
    dialect: 'mysql'
})

const url = new Sequelize('shorten_urls', 'root', '', {
    host: process.env.SQL_URL,
    dialect: 'mysql'
})
url.sync();
user.sync();
module.exports = { 
    url, 
    user
}