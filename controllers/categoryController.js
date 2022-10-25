const Produce = require('../models/produce');
const Category = require('../models/category');
const async = require('async');

const { body, validationResult } = require('express-validator');

// list of all categories
exports.category_list = function (req, res, next) {
    Category.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_categories) {
            if (err) {
                return next(err);
            }
            res.render('category_list', {
                title: 'Category List',
                list_categories: list_categories,
            });
        });
};


// specific category
exports.category_detail = function (req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        category_produce: function(callback) {
            Produce.find({ category: req.params.id }).exec(callback);
        },
    },
    function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.category === null) {
            const err = new Error('Category could not be found');
            err.status = 404;
            return next(err);
        }
        res.render('category_detail', {
            title: 'Category Detail',
            category: results.category,
            category_produce: results.category_produce,
        });
    });
};