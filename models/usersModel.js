
const mongodb = require('../config/database');
const usersSchema = new mongodb.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    status: Boolean
});
const usersModel = mongodb.model('users', usersSchema);
module.exports = usersModel;