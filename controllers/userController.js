const usersModel = require("../models/usersModel");

class userController {
    static async index(req, res, next) {
        const page = req.query.page;
        const query = {};
        if (req.query.search) {
            query.username = req.query.search;
        }
        const options = {
            page: parseInt(page, 10) || 1,
            limit: 1
        }
        usersModel.paginate(query, options).then((results, err) => {
            if (!err) {
                //Pass the total pages number to pug along with the result
                res.render('audit-log', {
                    testObj: results.docs,
                    page_count: results.totalPages
                })
                res.render('admin/user/index.pug', {
                    users: results.docs,
                    paging_counter: results.pagingCounter,
                    limit: results.limit,
                    total_docs: results.totalDocs,
                    page_count: results.totalPages,
                    current_page: results.page,
                    'title': 'Users List',
                    reqData: req.query
                });

            }
        })
        const users = await usersModel.find();
    }
}
module.exports = userController;