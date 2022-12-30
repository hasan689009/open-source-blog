
const mongodb = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const categoriesSchema = new mongodb.Schema({
    name: String,
    status: Boolean
});
categoriesSchema.plugin(mongoosePaginate);
const categoriesModel = mongodb.model('categories', categoriesSchema);
module.exports = categoriesModel;