const routes = require('express').Router();

routes.get('/', (req, res) => {
    return res.send({error: true, message: 'Login Success'})
});

module.exports = routes;