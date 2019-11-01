var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageSchema=new Schema({
    sender : {
        type : String,
    },
    receiver : {
        type : String
    },
    message : {
        type : String
    },
    roomID : {
        type: String
    }
})
mongoose.model('Message',messageSchema);