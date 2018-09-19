const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const auth = require('./routes/auth');
const user = require('./routes/user');
const userAccount = require('./routes/userAccount');

const passport = require('passport')

require ('./config/passport')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'))

app.use('/user-account/', userAccount);
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.all('*', function (req, res, next) {
    return res.send('Page not found')
    next();
})

app.listen(3000, function () {
    console.log('Your Server is running on port 3000');
});
