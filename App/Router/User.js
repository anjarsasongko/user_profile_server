const routes = require('express').Router();
const mc = require('../env')
const uuid = require('uuidv4')
const bcrypt = require('bcrypt')

routes.get('/', (req, res) => {
    mc.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed get user datas'})
        }
        return res.send({error: false, data: result, message: 'Success get user datas'})
    })
});

routes.get('/:id', (req, res) => {
    // mc.query("SELECT * FROM users where username ='"+req.params.username+"' OR email = '"+req.params.username+"'", req.params.id, (err, result) => {
    //     if (err) {
    //         return res.send({error: true, message: 'Failed get user datas'})
    //     }
    //     return res.send({error: false, data: result, message: 'Success get user datas'})
    // })
    return res.send(req.params)
});

routes.post('/', (req, res) => {
    mc.query("INSERT INTO users (id, user_id, username, email, email_verified_at, password, created_at, updated_at)"
    +"VALUE ('"+uuid()+"','"+req.body.user_id+"' , '"+req.body.username+"', '"+req.body.email+"', now(), '"+req.body.password+"', now(), now())",
    (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed get user datas'})
        }
        return res.send({error: false, data: result, message: 'Success get user datas'})
    })
});

module.exports = routes;