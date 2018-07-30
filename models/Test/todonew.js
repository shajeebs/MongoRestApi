'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var todoSchema = mongoose.Schema({
  createdAt:{
    type: Date,
    default: Date.now
  },
  todoText: String,
  todoDesc: String
});


todoSchema.plugin(mongooseApiQuery)
todoSchema.plugin(createdModified, { index: true })
var todoModel = mongoose.model('todonew', todoSchema)
var todo = restifyMongoose(todoModel);
server.get('/todonew', todo.query());
server.get('/todonew/:id', todo.detail());
server.post('/todonew', todo.insert());
server.put('/todonew/:id', todo.update());
server.patch('/todonew/:id', todo.update());
server.del('/todonew/:id', todo.remove());
server.get('/todonew/:search/:option', function(req, res, next) {
    var queryContainsString = {name:{'$regex' : req.params.search, '$options' : 'i'}};//'string'
    var queryStartsWith = {name:{'$regex' : '^' + req.params.search, '$options' : 'i'}}; //'^string'
    var queryExactCase = {name:{'$regex' : '^' + req.params.search +'$', '$options' : 'i'}}; //'^string$'
    var queryEndsWith = {name:{'$regex' : req.params.search +'$', '$options' : 'i'}};//'string$'
    var queryNotContainsString = {name:{'$regex' : '^((?!' + req.params.search +').)*$', '$options' : 'i'}};//'^((?!string).)*$'
    var query = queryContainsString;
    if(req.params.option){
        switch (req.params.option) {
            case 0: query = queryContainsString; break;
            case 1: query = queryStartsWith; break;
            case 2: query = queryExactCase; break;
            case 3: query = queryEndsWith; break;
            case 4: query = queryNotContainsString; break;
            default: query = queryContainsString;
        }
    }
    todoModel.find(query)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
})
 