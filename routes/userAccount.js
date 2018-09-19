const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(UIDGenerator.BASE16);
const uidgenPass = new UIDGenerator(null, 10);
const nodemailer = require('nodemailer');

router.post('/sign-up', function (req, res, next) {
  let data = req.body
  bcrypt.hash(req.body.password, 5, function (err, hash) {
    uidgen.generate((err, uid) => {
      if (err) throw err;
      db.query("INSERT INTO users (id, username, email, email_verified_at, password, created_at, updated_at)"
        + "VALUE (?,?,?,now(),?,now(),now())", [uid, data.username, data.email, hash], (error, result, fields) => {
          if (error) throw error
          if (result) {
            let address = '1600 Amphitheatre Parkway, Mountain View, CA, 94043'
            let long = '-122.083739'
            let lat = '37.423021'
            let telephone = '+6281234567'
            let image = 'image.png'
            db.query("INSERT INTO user_profiles (id, name, address, longitude, latitude, telephone, image, created_at, updated_at)"
              + "VALUE (?,?,?,?,?,?,?,now(),now())", [uid, data.username, address, long, lat, telephone, image], (err, row) => {
                res.send({ error: false, data: { result, row }, message: 'Success Get Profile' });
              })
          }
        })
    });
  });
});

router.post('/forget', (req, res, next) => {
  if (req.body.email != '') {
    let data = req.body
    uidgenPass.generate((err, uid) => {
      bcrypt.hash(uid, 5, function (err, hash) {
        if (err) throw err;
        db.query("UPDATE users SET password='" + hash + "' WHERE email= '" + data.email + "'", (error, result, fields) => {
          if (error) throw error
          if (result) {
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'anjartonky220@gmail.com',
                pass: 'bukaakun13'
              }
            });

            const mailOptions = {
              from: 'admin@mail.com', // sender address
              to: data.email, // list of receivers
              subject: 'Test Email', // Subject line
              html: '<p>Hay, here your account information.'
                + '<p>Here your email : ' + data.email + '.</p>' + '</br>'
                + '<p>Here your password : ' + uid + '.</p>' + '</br>'
                + '<p>Please change your password soon.</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
              if (err)
                console.log(err)
              else
                console.log(info);
              res.send({ error: false, data: { result }, message: 'Success Send Mail' });
            });
          }
        })
      });
    });
  }
})

module.exports = router;