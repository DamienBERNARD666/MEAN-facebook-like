/*global console, require, module, express */
const mongoose = require('mongoose');
 
var contactSchema = new mongoose.Schema({
    main: {
        type: String,
        required: 'Email can\'t be empty'
    },
    contact: {
        type: String,
        required: 'Email can\'t be empty'
    },
});

contactSchema.index({main: 1, contact: 1}, {unique: true});

mongoose.model('Contact', contactSchema);