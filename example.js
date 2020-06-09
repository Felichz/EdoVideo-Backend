const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { config } = require('./config');

app.get('/:name?', (req, res) => {
    const name = req.params.name || '';
    res.send(`
        <form method="POST" action="form">
            <label>
                Name:
                <input name="name" value="${name}">
            </label>
            <Button type="submit">Send</Button>
        </form>
    `);
});

app.get('/json', (req, res) => {
    res.send({ hello: 'world' });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    const obj = {
        ...req.body,
        ...req.query,
    };
    res.json(obj);
});

app.get('/bisiesto/:year', (req, res) => {
    const y = req.params.year;

    res.send((y % 4 === 0 && y % 100 !== 0) || y % 400 == 0);
});

app.listen(config.port, function () {
    console.log(`Server listening to port ${config.port}`);
});
