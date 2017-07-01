var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true},
    hashed_pwd: String,
    salt: String,
    activationToken: String,
    activated: Boolean
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    var hmac = crypto.createHmac('sha1', this.salt);
    hmac.setEncoding('hex');
    hmac.write(password);
    hmac.end();

    this.hashed_pwd = crypto.pbkdf2Sync(password, this.salt, 1000, 32).toString('hex');
    this.activationToken = hmac.read();
    this.activated = false;
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 32).toString('hex');

    return this.hashed_pwd === hash;
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);

    exp.setDate(today.getDate()+60);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000), 
    }, 'SECRET');
};


mongoose.model('users', UserSchema);