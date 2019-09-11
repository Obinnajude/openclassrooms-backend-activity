// MONGODB PASSWORD:  UgGOdkhyjnGdj8T
// MONGODB CONNECTION: mongodb+srv://obums:<password>@cluster0-068me.gcp.mongodb.net/test?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://obums:UgGOdkhyjnGdj8T@cluster0-068me.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
	.then(() => {
		console.log('Successfully connected to MongoDB Atlas');
	})
	.catch((error) => {
		console.log('Unable to connect to MongoDB Atlas');
		console.error(error);
	});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
Recipe.deleteOne({_id: '5d78ef9f726ae91390ce1e36'});
Recipe.deleteOne({_id: '5d78ef8f726ae91390ce1e35'});
app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
  	title: req.body.title,
  	instructions: req.body.instructions,
  	ingredients: req.body.ingredients,
  	time: req.body.time,
  	difficulty: req.body.difficulty
  });
  recipe.save().then(
  	() => {
  		res.status(201).json({
  			message: 'Post saved successfully!'
  		});
  	}
  ).catch(
  	(error) => {
  		res.status(400).json({
  			error: error
  		});
  	}
  );
});


app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
  	_id: req.params.id,
  	title: req.body.title,
  	instructions: req.body.instructions,
  	ingredients: req.body.ingredients,
  	time: req.body.time,
  	difficulty: req.body.difficulty
  });
  Recipe.updateOne({_id: req.params.id}, recipe).then(
  	() => {
  		res.status(201).json({
  			message: 'Recipe updated successfully!'
  		});
  	}
  ).catch(
  	(error) => {
  		res.status(400).json({
  			error: error
  		});
  	}
  );
});

app.delete('api/recipes/:id', (req, res, next) => {
	Recipe.deleteOne({_id: req.params.id}).then(
		() => {
			res.status(200).json({
				message: 'Deleted!'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
});

app.get('/api/recipes/:id', (req, res, next) => {
	Recipe.findOne({
		_id: req.params.id
	}).then(
		(recipe) => {
			res.status(200).json(recipe);
		}
	).catch(
		(error) => {
			res.status(404).json({
				error: error
			});
		}
	);
});

app.use('/api/recipes', (req, res, next) => {
	Recipe.find().then(
		(recipes) => {
			res.status(200).json(recipes);
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);  
});

module.exports = app;