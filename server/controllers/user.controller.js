const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Contact = mongoose.model('Contact')

module.exports.inscription = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.family = "";
    user.age = 1.
    user.race = "";
    user.food = "Viande";
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code == 11000) {
                res.status(422).send(['Un doublon d\'adresse email a été trouvé.']);
            } else {
                return next(err);
            }
        }

    });
}

module.exports.authentification = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        }
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.profilUtilisateur = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'L\'utilisateur n\'a pas été trouvé.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email', 'family', 'age', 'race', 'food']) });
        }
    );
}


module.exports.updateProfil = (req, res, next) => {
    console.log(req._id);
    User.updateOne({ _id: req._id }, req.body,
        (err, user) => {
            res.status(200).json({
                fullName: user.fullName,
                email: user.email,
                family: user.family,
                age: user.age,
                race: user.race,
                food: user.food
            })
        })
}




module.exports.getAllRegisteredUsers = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            User.find({ email: { $ne: user.email } },
                (err2, users) => {
                    Contact.find({ main: user.email },
                        (err3, contacts) => {
                            let ccontacts = [];
                            for (var i = 0; i < users.length; i++) {
                                var notFound = true;
                                for (var j = 0; j < contacts.length; j++) {
                                    if (contacts[j].contact == users[i].email) {
                                        notFound = false;
                                        break;
                                    }
                                }

                                if (notFound)
                                    ccontacts.push(users[i].email);
                            }
                            res.status(200).json(ccontacts);
                        })
                }
            )
        })

}