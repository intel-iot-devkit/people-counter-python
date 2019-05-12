module.exports = {
    database: {
        file: "./db/data.db"
    },

    restify: {
        port: 8000,
        host: "localhost",
        options: {
            name: "Intel Facial Recognition Server"
        }
    },
    api: './api/swagger.json',

    mqtt: {
        backingStore: {

        },
        port: 1884,
        host: 'localhost',
        http: {port: 3000, bundle: true, static: './'}  
    }
}
