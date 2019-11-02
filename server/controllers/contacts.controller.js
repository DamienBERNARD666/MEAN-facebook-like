const passport = require('passport');
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");
const User = mongoose.model("User");

module.exports.new = (req, res, next) => {
    var contact = new Contact();
    var contact2 = new Contact();
    // console.log(req._id);
    contact2.main = req.body.email
    contact.contact = req.body.email;
    contact.roomID = contact._id;
    contact2.roomID = contact._id;
        User.findOne({ _id: req._id },
        (err, doc) => {
            contact2.contact = doc['email'];
            contact.main = doc['email'];
            contact.save((err, doc) => {
                console.log("New contact saved :", doc);
                if(!err){
                    contact2.save();
                    res.send(doc);
                    res.end();
                }
                else
                {
                    if(err.code == 11200 || err.code == 11000) // Duplicate found
                    {
                        res.status(422).send(["Duplicate contact address found"]);
                        res.end();
                    }
                    else
                        return next(err);
                }
            })
        
        }
    )
}


module.exports.getContacts = (req, res, next) => {
    // console.log(req._id);
    User.findOne({ _id: req._id },
        (err, user) => {
            Contact.find({ main: user.email },
                (err, contacts) => {
                    res.status(200).json(contacts);
                    // console.log(contacts);
                })
        }
    )
}

module.exports.delete = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            Contact.deleteOne({main: user.email, contact: req.params.email}, (err, res) => {
               if(!err)  { Contact.deleteOne({main: req.params.email, contact: user.email}) };
            })
        }
    )
}

module.exports.addExterneContact = (req, res, next) => {
    var contact = new Contact();
    var contact2 = new Contact();
    contact.contact = req.body.contact;
    contact2.main = req.body.contact;
    contact.roomID = contact._id;
    contact2.roomID = contact._id;
    console.log(req._id);
    User.findById(req._id, (err, doc) =>{
        contact.main = doc['email'];
        contact2.contact = doc['email'];
        contact.save((err, doc) =>{
            if(!err) {
                contact2.save();
                res.send(doc);
                res.end();
            } else {
                console.log(err)
                if(err.code === 1100) {
                    res.status(422).send['Doublon trouvé'];
                }
                else {
                    return next(err);
                }
            }
        })
    })
}