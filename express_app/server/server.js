const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', (err, data) => {
        if (err) {
            console.log(err);
            res.send({ result: 0, text: err });
            return;
        }

        res.send(data);
    })
});


app.listen(3000, () => console.log('Server started...'));

// app.get();
// app.post();
// app.put();
// app.delete();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// app.get('/api/products', (req, res) => {
//     res.send(JSON.stringify([
//         { name: 'keyboard' },
//         { name: 'keyboard' },
//         { name: 'keyboard' }
//     ]));
// });
//
// app.get('/api/products/:id', (req, res) => {
//     // res.send(req.params.id);
//     res.send(req.query);
// });