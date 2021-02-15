const express = require('express');
const handler = require('./handler');
const fs = require('fs');
const router = express.Router();

//получение товаров корзины от сервера
router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        res.send(data);
    })
});
//добавить новый товар в корзину
router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});
//изменить количество товара в корзине
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
});
//удалить товар из корзины
router.delete('/:id', (req, res) => {
    handler(req, res, 'del', 'server/db/userCart.json');
});

module.exports = router;