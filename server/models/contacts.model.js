/*global console, require, module, express */
const mongoose = require('mongoose');
 
var contactSchema = new mongoose.Schema({
    main: {
        type: String,
        required: 'Le compte est nécessaire'
    },
    contact: {
        type: String,
        required: 'Email'
    },
});

contactSchema.index({main: 1, contact: 1}, {unique: true});

mongoose.model('Contact', contactSchema);