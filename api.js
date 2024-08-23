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
    console.log({ request: '/getAll' });
    try {
        let url = new Url();
        url.getAll(function (obj) {
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
app.get('/goto/:url', (req, res) => {
    console.log({ request: '/goto/' + req.params.url });

    try {
        let url = new Url();
        url.getByShort(req.params.url, function (obj) {
            if (obj && obj[0] && obj[0].full_url) {
                let redUrl = obj[0].full_url;
                let pattern = new RegExp('^(https?|ftp)://');
                if (!pattern.test(redUrl)) {
                    redUrl = "http://" + redUrl;
                }
                res.status(301).redirect(redUrl);
            } else {
                res.status(500).send("Falha ao carregar URL");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// ADD
app.post('/add', (req, res) => {
    console.log({ request: '/add', body: req.body.full_url });
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
