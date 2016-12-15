'use strict';

exports.setup = function (runningApp, callback) {
    runningApp.disable("x-powered-by");
    runningApp.set('view engine', 'handlebars');
    runningApp.engine('handlebars', require('hbs').__express);
    runningApp.use('/', require('./homedoc'));
    runningApp.use('/scrape', require('./scraper'));

    // var socketio = require('socket.io')(runningApp.http);
    // require('fauxchatapp')(socketio);


    console.log(process.env.MONGODB_URI);

    if (typeof callback === 'function') {
        callback(runningApp);
    }
};
//# sourceMappingURL=appConfig.js.map