const cors = require('cors');

const express = require('express');
const app = express();

const Url = require("./modules/url");

app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening port: ' + port));

// GET ALL
app.get('/getAll', (req, res) => {
    console.log('/getAll');
    try {
        let url = new Url();
        url.getAll(function (obj) {
            console.log(obj);
            return !obj ?
                res.status(500).send("Falha ao carregar lista de URLs") :
                res.status(200).send(obj);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// GOTO
app.get('/:url', (req, res) => {
    console.log('/:url');
    try {
        let url = new Url();
        url.getByShort(req.params.url, function (obj) {
            console.log("redirecting to "+req.params.url);
            res.redirect(obj[0].full_url);
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// ADD
app.post('/add', (req, res) => {
    console.log('/add');
    try {
        let url = new Url();
        url.add(req.body.full_url, function (obj) {
            return !obj || !obj.affectedRows ?
                res.status(500).send("Falha ao adicionar URL") :
                res.status(200).send(obj);
        });

    } catch (e) {
        res.status(500).send(e);
    }
});
