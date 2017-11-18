var mongoose = require('mongoose');


UserSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});

module.exports = mongoose.model('User', UserSchema,'users');