const { SchemaType } = require("mongoose");

const mongoose = required('mongoose');

const Schema = mongoose.Schema;

const ProduceSchema = new Schema ({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    type: { type: Schema.ObjectId, ref: 'Type' }
});

ProduceSchema.virtual('url').get(function () {
    return '/catalog/produce/' + this._id;
});

module.exports = mongoose.model('Produce', ProduceSchema);