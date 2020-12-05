const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const App = require('./app/app');
let moment = require('moment-timezone');

Database.connect();

App.listen(CONFIG.PORT, function (error) {
    if (error) return console.log(error);
    console.log(`Servidor corriendo en el puerto: ${CONFIG.PORT}`);
})