const passport = require('passport');
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
const Message = mongoose.model('Message');

module.exports.getAllMessagesReceived = (req, res, next) => {
    console.log(req._id);
    User.findOne({ _id: req._id },
        (err, user) => {
            // console.log(user);
            Message.find({ receiver: user.email },
                (err, messages) => {
                    // console.log(messages);
                    res.status(200).json(messages);
                });
        })
}


module.exports.getAllMessagesSend = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            Message.find({ sender: user.email },
                (err, messages) => {
                    // console.log(messages);
                    res.status(200).json(messages);
                });
        })
}

module.exports.newMessage = (req, res, next) => {

}

