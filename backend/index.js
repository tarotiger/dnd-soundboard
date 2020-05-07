const express = require('express');
const router = express.Router();
const port = 5000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const creds = require('./config');

let transport = {
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: creds.USER, 
        pass: creds.PASS
    }
}

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready to take messages');
    }
})

router.post('/send', (req, res, next) => {
    let name = req.body.name; 
    let email = req.body.email;
    let message = req.body.message;

    let content = `name: ${name} \n email: ${email} \n message: ${message}`;

    let mail = {
        from: name,
        to: 'redtiger.rabbit@gmail.com',
        subject: 'Homepage Contact Form',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router)
app.listen(port);