const cart = require('./cart');
const fs = require('fs');

const handler = (req, res, action, file) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        let newCart = cart[action](JSON.parse(data), req);
        fs.writeFile(file, newCart, (err) => {
            if (err) {
                console.log(err);
                res.send({ result: 0, text: err });
                return;
            }

            res.send({ result: 1 });
        });
    })
};

module.exports = handler;