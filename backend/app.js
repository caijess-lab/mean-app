// import d'express
const express = require('express');
const bodyParser = require('body-parser');
// import de mongoose
const mongoose = require('mongoose');
// import du modèle Mongoose
const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://j_admin:45GTtid4s9GiSk@cluster0.5rv01.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// notre application
const app = express(); // express() permet de créer l'application express

// app.use(express.json());
/* --------------------------------------- */
/* app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message : 'Votre requête a bien été reçue !'});
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
}); */

/* -------------------------------------- */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
  
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    // enregistrement de thing dans la BD
    thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


app.use('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
});

/* ------------------------------------- */

// export de l'application pour pouvoir y accéder depuis les autres fichiers du projet, notamment le serveur node
module.exports = app;