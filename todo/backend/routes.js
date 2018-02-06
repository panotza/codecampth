const router = require('koa-router')();
const ctrl = require('./controllers/todo');
const c = require('./cache');

router
    .get('/todo', ctrl.list)
    .post('/todo', ctrl.create)
    .get('/todo/:id', ctrl.get)
    .delete('/todo/:id', ctrl.delete)
    .put('/todo/:id/complete', ctrl.setComplete)
    .delete('/todo/:id/complete', ctrl.setIncomplete);

module.exports = router;