
const mongodb = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const usersSchema = new mongodb.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    status: Boolean
});
usersSchema.plugin(mongoosePaginate);
const usersModel = mongodb.model('users', usersSchema);
module.exports = usersModel;