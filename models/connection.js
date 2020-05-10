const Sequelize = require('sequelize');

const user = new Sequelize('shorten_urls', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

const url = new Sequelize('shorten_urls', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
})
url.sync();
user.sync();
module.exports = { 
    url, 
    user
}