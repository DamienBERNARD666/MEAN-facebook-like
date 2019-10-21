const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // Si l'utilisateur est inconnu
                    else if (!user)
                        return done(null, false, { message: 'L\'adresse email n\'est pas enregistré' });
                    // Mot de passe inconnuu
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Mauvais mot de passe.' });
                    // Réussite de la connexion
                    else
                        return done(null, user);
                });
        })
);