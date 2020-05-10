const { Model, Sequelize } = require('sequelize');
const connection = require('./connection');

class User extends Model { }

// User.sync().then(() => {
User.init({
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
    createdAt: { type: Sequelize.DATE, default: Sequelize.NOW },
},
    {
        indexes: [{ unique: true, fields: ['email'] }], sequelize: connection.user, modelName: 'user'
    })
// })

module.exports = {
    User
}