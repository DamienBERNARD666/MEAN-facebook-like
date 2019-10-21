require('./config/config');
require('./models/db');
require('./config/passport.config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

var app = express();

const rts = require('./routes/routes');

//Configuration des middlewares

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rts);


// Permet de gérer les erreurs
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});


//Lancement du serveur
app.listen(process.env.PORT, () => console.log('Le serveur est lancé sur le port :' + `${process.env.PORT}`));

//Permet les requêtes cross

app.use(function (req, res, next) {
    "use strict";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});