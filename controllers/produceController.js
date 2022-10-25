const Produce = require('../models/produce');
const Category = require('../models/category');
const async = require('async');

const { body, validationResult } = require('express-validator');

exports.index = function (req, res, next) {
    res.render('index', {
        title: 'Kristopher\'s Produce Market',
    });
};

exports.produce_list = function (req, res, next) {
    Produce.find()
        .sort({ title: 1})
        .populate('category')
        .exec(function (err, list_produce) {
            if (err) {
                return next(err);
            }
            res.render('produce_list', {
                title: 'Produce List',
                produce_list: list_produce,
            });
        });
};

exports.produce_detail = function (req, res, next) {
    Produce.find(req.params.id)
        .populate('category')
        .exec(function (err, produce) {
            if (err) {
                return next(err);
            }
            res.render('produce_detail', {
                title: produce.name,
                produce: produce,
            });
        });
};
