module.exports = function (app, nodemailer) {

// Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    //create a SMTP transporter object

    var transporter =nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: account.smtp.secure,
        auth: {
            user: 'ayfj3kcn76d2c5rn@ethereal.email',
            pass: 'u1ksB36r5j5RAc1J35'
        }
    });

    //Message object
    var message = {
        from : 'Sender Name <sender@example.com>', 
        to : 'Recipient <recipient@example.com>',
        subject: 'Nodemailer is unicode friendly',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info)=>{
        if(err){
            console.log('Error occured. '+err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

}