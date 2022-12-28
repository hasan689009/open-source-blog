const usersModel = require("../models/usersModel");

class userController {
    static index(req, res, next) {
        const page = req.query.page;
        const query = {};
        if (req.query.search) {
            query.username = req.query.search;
        }
        const options = {
            page: parseInt(page, 10) || 1,
            limit: process.env.PAGINATION_LIMIT
        }
        usersModel.paginate(query, options).then((results, err) => {
            if (!err) {
                //Pass the total pages number to pug along with the result
                res.render('admin/user/index.pug', {
                    users: results.docs,
                    paging_counter: results.pagingCounter,
                    limit: results.limit,
                    total_docs: results.totalDocs,
                    page_count: results.totalPages,
                    current_page: results.page,
                    'title': 'Users List',
                    reqData: req.query,
                    success_message: req.flash('success_message'),
                    error_message: req.flash('error_message')
                });

            }
        })
    }

    static async create(req, res) {
        const user = new usersModel(req.body);
        const is_saved = user.save();
        if (is_saved) {
            req.flash('success_message', 'New user saved successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }

    static async getById(req, res) {
        await usersModel.findById(req.params.id).lean().exec(function (err, users) {
            return res.json(users);
        });
    }

    static async update(req, res) {
        const update = {
            'name': req.body.name,
            'username': req.body.username,
            'status': req.body.status
        };
        const is_updated = await usersModel.findOneAndUpdate({'_id' : req.params.id}, update);
        if (is_updated) {
            req.flash('success_message', 'user updated successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }

    static async delete(req, res) {
        const is_delete = await usersModel.deleteOne({'_id': req.params.id});
        if (is_delete) {
            req.flash('success_message', 'user deleted successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }
}
module.exports = userController;