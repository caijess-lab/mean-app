// import d'express
const express = require('express');
const bodyParser = require('body-parser');
// import de mongoose
const mongoose = require('mongoose');
// import du modèle Mongoose
const Product = require('./models/product');

mongoose.connect('mongodb+srv://j_admin:45GTtid4s9GiSk@cluster0.5rv01.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// notre application
const app = express(); // express() permet de créer l'application express

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    // delete req.body._id;
    const product = new Product({
        name: "test",
    description: "description",
    price: 90,
    inStock: true
    });
    console.log(product);
    // enregistrement du product dans la BD
    product.save()
    .then(() => res.status(201).json({ product: product}))
    .catch(error => res.status(400).json({ error }));
})

app.put('/api/products/:id', (req, res, next) => {
    console.log(req);
    Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => {console.log(req.body); res.status(200).json({ id: req.params.id, message: 'Modified !'});})
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Deleted !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({_id: req.params.id})
    .then(product => res.status(200).json({product: product}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/products', (req, res, next) => {
    Product.find()
    .then(products => res.status(200).json({products: [products]}))
    .catch(error => res.status(400).json({ error }));
});

/* ------------------------------------- */

// export de l'application pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;