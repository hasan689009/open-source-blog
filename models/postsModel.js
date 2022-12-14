
const mongodb = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const categoriesModel = require('./categoriesModel');
const postsSchema = new mongodb.Schema({
    title: String,
    categoryId: {
        type: mongodb.Schema.ObjectId,
         ref: 'categories'
       },
    details: String,
    status: Boolean,
    fileName : String,
});
postsSchema.plugin(mongoosePaginate);
const postsModel = mongodb.model('posts', postsSchema);
module.exports = postsModel;