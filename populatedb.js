#! /usr/bin/env node

console.log('This script populates some test produce and categories to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
const Produce = require('./models/produce');
const Category = require('./models/category');

var mongoose = require('mongoose');
const category = require('./models/category');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let produces = [];
let categories = [];

function categoryCreate(name, cb) {
  var category = new Category({ name: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Cateogry: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function produceCreate(name, description, price, stock, category, cb) {
  producedetail = { 
    name: name,
    description: description,
    price: price,
    stock: stock,
  }
  if (category != false) producedetail.category = category;
    
  var produce = new Produce(producedetail);    
  produce.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Produce: ' + produce);
    produces.push(book)
    cb(null, book)
  }  );
}

function createCategory(cb) {
    async.series([
        function(callback) {
            categoryCreate("Fruit", callback);
        },
        function(callback) {
            categoryCreate("Vegetable", callback);
        },
        ],
        // optional callback
        cb);
}

function createProduce(cb) {
    async.parallel([
        function(callback) {
            produceCreate('Watermelon', 'Green fruit', 4.99, 2, categories[0], callback);
        },
        function(callback) {
            produceCreate('Potato', 'Brown Vegetable', 1.99, 10, categories[1], callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createCategory,
    createProduce
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});