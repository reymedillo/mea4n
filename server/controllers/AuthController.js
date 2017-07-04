var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('users');
var mailer = require('../shared/mailer');
var http = require('http');
// Configuration
var env = require('../config/environment.js')();
var config = require('../config/config.js')[env];

// Register New User
exports.create = function(req, res, next) {
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields.'});
  }

  var user = new User();
  user.username = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err, response) {
    if(err) {
      if(err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Email Registered.');
        return res.status(400).json({msg:err.toString()});
      }
      return res.status(400).json({msg:err});
    }
    var subject = 'Client Portal Confirmation Email';
    var body = 'Welcome ! Thanks for signing up. Please follow this link to activate your account: \n\n' +
    'http://' + req.get('host') + '/api/auth/confirmation/' + response.activationToken + ' \n' +
    'Once you have visited the verification URL, your account will be activated.' + '\n\n' +
    'Thanks! \n';
    mailer.deliverMail(req.body.email, subject, body); // SEND EMAIL

    return res.json({
      id: response._id,
      email: response.username,
      token: user.generateJWT()
    });
  });
}

// Login User
exports.login = function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    console.log(req.body);
    return res.status(400).json({message: 'Please fill out all fields.'});
  }
  var options = {
    host: config.external_api.host,
    port: config.external_api.port,
    path: config.external_api.path + 'email/' + req.body.username,
    method: 'GET'
  };

  var str= '';
  http.get(options, function(resp){  // call CODEV API to check the email provided
    resp.on('data', function(chunk){
      str += chunk;
      console.log(str);
      if(str && str !== 'null') {
        //  add here to find if the username already registered in mongodb
        passport.authenticate('local', function(err, user, info){
          if(err) { return next(err); }
          if(user) {
            return res.json({token: user.generateJWT(), id: user._id, email: user.username});
          } else {
            return res.status(401).json(info);
          }
        })(req, res, next);
        // end find username
      }
      else {
        return res.status(200).json({msg: 'Sorry, either your email is inactive or client supervisor is empty.'});
      }
    });
  }).on("error", function(e){
    return res.status(401).json({msg: e.message});
  });

}
