class MysqlConnect {
    constructor() {
        this.mysql = require('mysql');
        const ConSettings = require("./consettings");
        this.connSettings = new ConSettings().getSettings();

        return this;
    }

    execute(query, callback) {
        try {
            console.log(query);
            var connection = this.mysql.createConnection(this.connSettings);
            connection.connect();
            connection.query(query, function(error, results, fields) {
                callback(results);
            });

            connection.end();
            return this;
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = MysqlConnect; 
