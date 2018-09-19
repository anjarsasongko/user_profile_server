const routes = require('express').Router()
const mc = require('../env')
const uuid = require('uuidv4')

routes.get('/', (req, res) => {
    mc.query('SELECT * FROM user_profiles', (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed get user profile datas'})
        }
        return res.send({error: false, data: result, message: 'Success get user profile datas'})
    })
});

routes.get('/:id', (req, res) => {
    mc.query('SELECT * FROM user_profiles where id = ?', req.params.id, (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed get user profile datas'})
        }
        return res.send({error: false, data: result, message: 'Success get user profile datas'})
    })
});

routes.post('/', (req, res) => {
    mc.query("INSERT INTO user_profiles (id, name, address, image, created_at, updated_at)"
    +"VALUE ('"+uuid()+"', '"+req.body.name+"', '"+req.body.address+"', '"+req.body.image+"', now(), now())",
    (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed create user profile datas'})
        }
        return res.send({error: false, message: 'Success create user profile datas'})
    })
});

routes.put('/:id', (req, res) => {
    mc.query("UPDATE user_profiles SET name = '"+req.body.name+"', address = '"+req.body.address+"', image = '"+req.body.image+"', updated_at = now()"
    +"WHERE id = ?",req.params.id,
    (err, result) => {
        if (err) {
            return res.send({error: true, message: 'Failed update user profile datas'})
        }
        return res.send({error: false, data: result, message: 'Success update user profile datas'})
    })
});

module.exports = routes;