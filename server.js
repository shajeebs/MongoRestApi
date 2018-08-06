var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
const corsMiddleware = require('restify-cors-middleware')
var mongoose = require('mongoose');
const config = require('./config'),
    bunyanWinston = require('bunyan-winston-adapter'),
    bunyan        = require('bunyan'),
    winston       = require('winston');


/**
* Logging
*/
global.log = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            timestamp: () => {
                return new Date().toString()
            },
            json: true
        }),
    ]
})

/**
* Initialize Server
*/
global.server = restify.createServer({
    name    : config.name,
    version : config.version,
    log     : bunyanWinston.createAdapter(log),
})

/**
* Middleware
*/
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.jsonBodyParser({ mapParams: true})) // For using x-www-form-urlencoded
server.use(restify.plugins.authorizationParser());
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*']
})
server.pre(cors.preflight)
server.use(cors.actual)


/**
* Error Handling
*/
server.on('uncaughtException', (req, res, route, err) => {
    log.error(err.stack)
    res.send(err)
});

server.listen(config.port, function () {
    mongoose.connect(config.db.uri);
    
    mongoose.connection.on('open', function(err) {
        if (err) {
            log.error('Mongoose default connection error: ' + err)
            process.exit(1)
        }
        
        console.log(
            '%s v%s ready to accept connections on port %s in %s environment.',
            config.name,
            config.version,
            config.port,
            config.env
        )
        require('./routes')
    })

    console.log('%s API service started and listening at %s', config.name, config.base_url);
});