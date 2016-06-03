/**
 * Created by tejas.siripurapu on 6/2/16.
 */
// Load dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');

// define user schema
var userSchema = mongoose.Schema({
    local : {
        email : String,
        password : String
    },
    facebook : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    twitter : {
        id : String,
        token : String,
        email : String,
        name : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    }
});

// Generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// Check validation
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);
