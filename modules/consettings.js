class ConSettings {
    constructor () {
        this.host = 'brnwg75t4c1ufl8khsmz-mysql.services.clever-cloud.com';
        this.user = 'ukqooaamjjhprffi';
        this.password = '7NkaZc9wKsjAM4wVJhNG';
        this.database = 'brnwg75t4c1ufl8khsmz';

        return this;
    }

    getSettings() {
        return {
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        };
    }
}
module.exports = ConSettings; 