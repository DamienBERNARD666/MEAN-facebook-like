const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Le nom est obligatoire.'
    },
    email : {
        type: String,
        require: 'L\'email est obligatoire.',
        unique: true
    },
    password : {
        type: String,
        required: 'Le mot de passe est nécessaire.',
        minlength: [4, 'Le mot de passe doit être d\'au moins 4 caractères de long.']
    },
    saltSecret: String,
    family: {
        type: String,
        required: false,
        default: ""

    },
    age: {
        type: Number,
        default: 1
    },
    race: {
        type:String,
        defaut: "",
        required: false
    },
    food: {
        type: String,
        defaut: "",
        required: false
    }
});

// Validation de l'adresse email via regex
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'L\'adresse email n\'est pas valide');


// Cryptage du mot de passe dans la base de donnée
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Méthode permettant de comparer les mots de passe via bcrypt
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

//Méthode permettant de générer un jsonwebtoken
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}




mongoose.model('User', userSchema);