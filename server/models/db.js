const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded'); }
    else { console.log('MongoDB connexion failed : ' + JSON.stringify(err, undefined, 2)); }
})

require('./user.model');
require('./contacts.model');