const routes = require('express').Router();

routes.get('/', (req, res) => {
    return res.send({error: true, message: 'hello dude'})
});

module.exports = routes;