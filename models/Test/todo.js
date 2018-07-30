'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin;
 
const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})
 
todoSchema.plugin(mongooseApiQuery)
todoSchema.plugin(createdModified, { index: true })
var todoModel = mongoose.model('todo', todoSchema)
var todo = restifyMongoose(todoModel);
server.get('/todo', todo.query());
server.get('/todo/:id', todo.detail());
server.post('/todo', todo.insert());
server.put('/todo/:id', todo.update());
server.patch('/todo/:id', todo.update());
server.del('/todo/:id', todo.remove());
server.get('/todo/:search/:option', function(req, res, next) {
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
 
