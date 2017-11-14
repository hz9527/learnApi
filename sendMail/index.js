var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config')

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

var sendMail = function (recipient, subject, html) {
    smtpTransport.sendMail({
        from: config.email.user,
        to: '981379316@qq.com',
        subject: 'test',
        html: 'testEmail'
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}
sendMail()
