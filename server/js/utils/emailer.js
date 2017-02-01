var nodemailer = require('nodemailer')
  , extend = require('extend')
  // connection
  , user = process.env.NODEMAILER_USER || ''
  , pass = process.env.NODEMAILER_PASS || ''
  , transportString = 'smtps://' + user + ':' + pass + '@smtp.gmail.com'

  // defaults
  , emailFrom = 'MyTestimony App <mytestimomyapp@gmail.com>'
  , emailTo = 'mytestimomyapp@gmail.com'
  , emailSubject = 'From MyTestimomy App'
  , emailText = 'Hello from MyTestimony App'
  , emailHtml = '<b>Hello from MyTestimony App</b>'
;

var transporter = nodemailer.createTransport(transportString);

// default mail options
var mailOptionsDefault = {
  from    : emailFrom,
  to      : emailTo,
  subject : emailSubject,
  text    : emailText,
  html    : emailHtml
};

var templates = {
  
};

// send email
function sendMail(opts, cb) {
  var mailOpts;

  cb = cb || function() {};

  // do proper over-riding of mailOptions
  if (opts) {
    mailOpts = extend({}, mailOptionsDefault, opts);
  } 

  transporter.sendMail(mailOpts, function sendEmailFn (err, info) {
    if (err) {
      console.log('sendMail error: ' + err);
      cb(err);
    }

    console.log('Message sent: ' + info.response);
    cb(null, info);
  });
}

var exports = {
  sendMail: sendMail
};

module.exports = exports;




