const categoriesModel = require("../models/categoriesModel");

class categoriesController{
    static  index(req, res)
    {
        const page = req.query.page;
        const query = {};
        if (req.query.search) {
            query.name = req.query.search;
        }
        const options = {
            page: parseInt(page, 10) || 1,
            limit: process.env.PAGINATION_LIMIT
        }
        categoriesModel.paginate(query, options).then((results, err) => {
            res.render('admin/categories/index.pug', {
                'title': 'Categories List',
                success_message: req.flash('success_message'),
                error_message: req.flash('error_message'),
                categories: results.docs,
                reqData: req.query,
                paging_counter: results.pagingCounter,
                limit: results.limit,
                total_docs: results.totalDocs,
                page_count: results.totalPages,
                current_page: results.page,
            });
        });
    }

    static async store(req, res){
        const categories = categoriesModel(req.body);
        const is_saved = categories.save();
        if (is_saved) {
            req.flash('success_message', 'New categories saved successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }

    static async getById(req, res)
    {
        const category = await categoriesModel.findById(req.params.id);
        return res.json(category);
    }

    static async delete(req, res)
    {
        const is_delete = await categoriesModel.deleteOne({'_id' : req.params.id});
        if (is_delete) {
            req.flash('success_message', 'categories deleted successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }

    static async update(req, res) {
        const is_updated = await categoriesModel.findOneAndUpdate({'_id' : req.params.id}, req.body);
        if (is_updated) {
            req.flash('success_message', 'categories updated successfully');
        } else {
            req.flash('error_message', 'May have some error please contact tech administrator')
        }
        res.redirect('back');
    }

    static async getAll(req, res) {
        return categoriesModel.find();
    }
}
module.exports = categoriesController;