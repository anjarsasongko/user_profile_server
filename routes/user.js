var express = require('express');
var router = express.Router();
const db = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/jwt-profile', function(req, res, next) {
  res.send(req.user);
});

router.get('/profile/:id', function(req, res, next) {
  db.query("SELECT users.id as id, user_profiles.name, users.email, users.email_verified_at, user_profiles.address, user_profiles.longitude, user_profiles.latitude , user_profiles.telephone, user_profiles.image "
  +"FROM user_profiles JOIN users ON user_profiles.id = users.id WHERE users.id=?",req.params.id, (error, result, fields)=>{
    if (error) throw error
    if (result) {
      let data = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        email_verified: result[0].email_verified_at,
        address: result[0].address,
        telephone: result[0].telephone,
        longitude: result[0].longitude,
        latitude: result[0].latitude,
        image: result[0].image
      }
      res.send({error: false, data: data, message: 'Success Get Profile'});
    }
  })
});

router.put('/profile/:id', function(req, res, next) {
  let data = req.body
  // db.query("UPDATE user_profiles JOIN users ON users.id = user_profiles.id "
  // +"SET user_profiles.name = '"+data.name+"', user_profiles.address = '"+data.address+"', user_profiles.longitude = '"+data.longitude+"',"
  // +" user_profiles.latitude = '"+data.latitude+"', user_profiles.telephone = '"+data.telephone+"' , user_profiles.update_at = now(), users.email = '"+data.email+"' "
  // +"WHERE users.id = '"+req.params.id+"' ", 
  // (error, result) => {
  //   res.send({error: false, data: {result}, message: 'Success Update Profile'});
  // })
  db.query("UPDATE user_profiles JOIN users ON users.id = user_profiles.id "
  +"SET user_profiles.name = '"+data.name+"', user_profiles.address = '"+data.address+"', user_profiles.longitude = '"+data.longitude+"',"
  +" user_profiles.latitude = '"+data.latitude+"', user_profiles.telephone = '"+data.telephone+"' , user_profiles.updated_at = now(), users.email = '"+data.email+"' "
  +"WHERE users.id = '"+req.params.id+"' ", 
  (error, result) => {
    res.send({error: false, data: {result}, message: 'Success Update Profile'});
  })
});

module.exports = router;