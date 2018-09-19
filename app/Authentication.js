'use strict'

const passport = require('passport')
const Strategy = require('passport-local')

passport.use(new Strategy((username, password, done)=> {
    if (username === 'admin' && password === 'admin') {
        done(null, {
            id: '7474abc',
            name: 'Sasongko',
            email: 'widhyosasongko@gmail.com',
            verified: true
        })
    }else {
        done(null, false)
    }
}))

module.exports = passport