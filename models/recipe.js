const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
	title: String, //{ type: String, required: true },
	instructions: String, //{type: String, required: true },
	ingredients: String, //{ type: String, required: true },
	time: Number, //{ type: Number, required: true },
	difficult: Number// { type: Number, required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);