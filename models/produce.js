const { SchemaType } = require("mongoose");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProduceSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Schema.ObjectId, ref: 'Category' }
});

ProduceSchema.virtual('url').get(function () {
    return '/catalog/produce/' + this._id;
});

module.exports = mongoose.model('Produce', ProduceSchema);