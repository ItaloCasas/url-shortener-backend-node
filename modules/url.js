const MysqlConnect = require("./mysqlconnect");

class Url {
    constructor() {
        this.db = new MysqlConnect();
    }
    getAll(callback) {
        try {
            let query = "SELECT * FROM shortened_url";
            console.log(query);
            new MysqlConnect().execute(query, callback);
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao carregar lista de URLs" };
        }
    }
    getByShort(shortUrl, callback) {
        try {
            let query = ["SELECT * FROM shortened_url WHERE short_url = '", shortUrl, "'"].join("");
            console.log(query);
            new MysqlConnect().execute(query, callback);
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao carregar URL" };
        }
    }

    add(fullUrl, callback) {
        try {
            let queryGetId = "SELECT MAX(id)+1 as nextId FROM shortened_url";
            new MysqlConnect().execute(queryGetId, function (ret) {
                const base62 = require("base62/lib/ascii");
                let encoded = base62.encode(ret[0].nextId).padStart(8, '0');
                console.log(encoded);
                let queryInsert = ["INSERT INTO shortened_url (full_url, short_url) VALUES (", fullUrl, ", ", encoded, ")"].join("'");
                new MysqlConnect().execute(queryInsert, callback);
            });
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao adicionar de URL" };
        }
    }
}

module.exports = Url; 