const MysqlConnect = require("./mysqlconnect");

class Url {
    constructor() {
        this.db = new MysqlConnect();
    }
    getAll(callback) {
        try {
            let query = "SELECT * FROM shortened_url";
            this.db.execute(query, callback);
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao carregar lista de URLs" };
        }
    }
    getByShort(shortUrl, callback) {
        try {
            let query = ["SELECT * FROM shortened_url WHERE short_url = ", shortUrl, ""].join("'");
            this.db.execute(query, callback);
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao carregar URL" };
        }
    }

    add(fullUrl, callback) {
        try {
            let queryGetId = ["SELECT t1.short_url, MAX(t2.id)+1 AS nextId FROM shortened_url t1 JOIN shortened_url t2 WHERE t1.full_url = ", fullUrl, ""].join("'");
            this.db.execute(queryGetId, (ret) => {
                if (ret[0].short_url) {
                    return callback({short_url: ret[0].short_url});
                }

                const base62 = require("base62/lib/ascii");
                let encoded = base62.encode(ret[0].nextId).padStart(8, '0');
                let queryInsert = ["INSERT INTO shortened_url (full_url, short_url) VALUES (", fullUrl, ", ", encoded, ")"].join("'");
                this.db.execute(queryInsert, (ret) => {
                    callback(ret ? {short_url: encoded} : ret);
                });
            });
        } catch (e) {
            console.log(e);
            throw { status: 500, msg: "Falha ao adicionar de URL" };
        }
    }
}

module.exports = Url; 