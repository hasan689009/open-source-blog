const mongodb = require('mongoose');
main().then(()=> console.log('Database connected')).catch(err => console.log(err));
async function main() {
  await mongodb.connect('mongodb://root:root@localhost:27017/blog?authMechanism=DEFAULT&authSource=admin');
}
module.exports = mongodb;