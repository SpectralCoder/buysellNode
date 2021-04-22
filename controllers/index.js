
var express = require('express'),
    router = express.Router();
// router.use('/socket', require('./socket'));
router.use('/users', require('./users'));
router.use('/shops', require('./shops'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/carts', require('./carts'));


const socketio = require('socket.io');






router.get('/', function (req, res) {
    res.render('index', {title: 'Boilerplate'});
});

router.get('*', function (req, res) {
    res.status(404).render('error', {
        title: 'Boilerplate', error: {
            status: 404,
            stack: 'Not found'
        }
    });
});

module.exports = router;
