var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;
 


 
var server = restify.createServer({
    name: 'restify.mongoose.examples.notes',
    version: '1.0.0'
});
 
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
var todoSchema = new mongoose.Schema({
    //noteId: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    comment: { type: String }
});
todoSchema.plugin(createdModifiedPlugin, {index: true});
var Todo = mongoose.model('todo', todoSchema);


// Now create a restify-mongoose resource from 'Note' mongoose model
var todos = restifyMongoose(Todo);
 
// Serve resource notes with fine grained mapping control
server.get('/todo', todos.query());
server.get('/todo/:id', todos.detail());
server.post('/todo', todos.insert());
server.patch('/todo/:id', todos.update());
server.del('/todo/:id', todos.remove());
 
server.listen(3033, function () {
    mongoose.connect('mongodb://merndbusr2:Password1!@ds249311.mlab.com:49311/merndb');
    console.log('%s listening at %s', server.name, server.url);
});
// var restify = require('restify');
// var restifyMongoose = require('restify-mongoose');
// var mongoose = require('mongoose');
// const config = require('./config'),
//     bunyanWinston = require('bunyan-winston-adapter'),
//     bunyan        = require('bunyan'),
//     winston       = require('winston');


// /**
// * Logging
// */
// global.log = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: 'info',
//             timestamp: () => {
//                 return new Date().toString()
//             },
//             json: true
//         }),
//     ]
// })

// /**
// * Initialize Server
// */
// global.server = restify.createServer({
//     name    : config.name,
//     version : config.version,
//     log     : bunyanWinston.createAdapter(log),
// })


// /**
// * Middleware
// */
// server.use(restify.plugins.acceptParser(server.acceptable));
// //server.use(restify.plugins.queryParser());
// server.use(restify.plugins.queryParser({ mapParams: true }))
// server.use(restify.plugins.bodyParser());
// server.use(restify.plugins.jsonBodyParser({ mapParams: true})) // For using x-www-form-urlencoded
// server.use(restify.plugins.authorizationParser());



// // Create a simple mongoose model 'Note'
// var todochema = new mongoose.Schema({
//     name: { type: String, required: true },
//   comment: { type: String }
// });

// var Todo = mongoose.model('todo', todochema);

// // Now create a restify-mongoose resource from 'Note' mongoose model
// var todo = restifyMongoose(Todo);

// // Serve resource todo with fine grained mapping control
// server.get('/todo', todo.query());
// server.get('/todo/:id', todo.detail());
// server.post('/todo', todo.insert());
// server.patch('/todo/:id', todo.update());
// server.del('/todo/:id', todo.remove());

// /**
// * Error Handling
// */
// server.on('uncaughtException', (req, res, route, err) => {
//     log.error(err.stack)
//     res.send(err)
// });
 

// server.listen(config.port, function () {
//     mongoose.connect('mongodb://merndbusr2:Password1!@ds249311.mlab.com:49311/merndb')
//     mongoose.connection.on('open', function(err) {
//         if (err) {
//             log.error('Mongoose default connection error: ' + err)
//             process.exit(1)
//         }
        
//         // console.log(
//         //     '%s v%s ready to accept connections on port %s in %s environment.',
//         //     config.name,
//         //     config.version,
//         //     config.port,
//         //     config.env
//         // )
//         //require('./routes')
//     })

//     console.log('%s API service started and listening at %s', config.name, config.base_url);
// });