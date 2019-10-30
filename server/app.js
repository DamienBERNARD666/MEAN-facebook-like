require('./config/config');
require('./models/db');
require('./config/passport.config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
var app = express();



app.use(cors({credentials: true, origin: true}));

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
let io = socketIO(server);



const rts = require('./routes/routes');

//Configuration des middlewares

app.use(bodyParser.json());

app.use(passport.initialize());
app.use('/api', rts);


// Permet de gérer les erreurs
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else {
        console.log(err);
    }
});



//Lancement du serveur

app.listen(process.env.PORT, () => console.log('Le serveur est lancé sur le port:' + `${process.env.PORT}`));

//Configuration du chat

io.on('connection', (socket) => {
    console.log("Utilisateur connected");

    // catching the message event
    socket.on('message', (message) => {
        // console.log(message);
       
        io.emit('new-message', {user: message.user, message: message.message});
    });
    // Event when a client is typing
    socket.on('typing', (data) => {
        // console.log(data);
        io.emit('typing', {user: data, isTyping: true});
    });
});



server.listen(process.env.PORT_CHAT, () => console.log('Le serveur du chat est lancé sur le port :' + `${process.env.PORT_CHAT}`));


//Permet les requêtes cross

app.use(function (req, res, next) {
    "use strict";
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});