const usersModel = require("../models/usersModel");

class userController {
    static async index(req, res, next){
        const {page} = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: 10
        }

        usersModel.paginate({}, options).then((results, err) => {
            if(!err){
            //Pass the totalpages number to pug along with the result
            console.log();
                res.render('audit-log', {testObj: results.docs, page_count: results.totalPages})
                res.render('admin/user/index.pug', {users: results.docs, paging_counter: results.pagingCounter, limit: results.limit, total_docs: results.totalDocs ,page_count: results.totalPages, current_page:results.page, 'title': 'Users List'});

            }
        })


        const users = await  usersModel.find();
    }
}
module.exports = userController;
