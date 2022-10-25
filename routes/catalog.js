const express = require('express');
const router = express.Router();

const produce_controller = require('../controllers/produceController');
const category_controller = require('../controllers/categoryController');


// Produce routes

// GET home page
router.get('/', produce_controller.index);

// GET & POST request produce form
router.get('/produce/create', produce_controller.produce_create_get);
router.post('/produce/create', produce_controller.produce_create_post);

// GET & POST request delete produce form
router.get('/produce/:id/delete', produce_controller.produce_delete_get);
router.post('/produce/:id/delete', produce_controller.produce_delete_post);

// GET & POST update produce
router.get('/produce/:id/update', produce_controller.produce_update_get);
router.post('/produce/:id/update', produce_controller.produce_update_post);

// GET request to read one produce
router.get('/produce/:id', produce_controller.produce_detail);

// GET request for list of all produce
router.get('/producelist', produce_controller.produce_list);

// Category routes

// GET request for creating a category. NOTE This must come before route that displays category (uses id).
router.get("/category/create", category_controller.category_create_get);

// POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request to delete category.
router.get("/category/:id/delete", category_controller.category_delete_get);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request to update category.
router.get("/category/:id/update", category_controller.category_update_get);

// POST request to update category.
router.post("/category/:id/update", category_controller.category_update_post);

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all category.
router.get("/categories", category_controller.category_list);