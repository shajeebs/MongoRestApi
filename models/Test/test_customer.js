'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
const test_customerSchema = new mongoose.Schema({
  name: { type: String, required: true },//
  comment: { type: String }
})
 
test_customerSchema.plugin(mongooseApiQuery)
test_customerSchema.plugin(createdModified, { index: true })
var test_customerModel = mongoose.model('test_customer', test_customerSchema)
var test_customer = restifyMongoose(test_customerModel);
server.get('/test_customer', test_customer.query());
server.get('/test_customer/:id', test_customer.detail());
server.post('/test_customer', test_customer.insert());
server.put('/test_customer/:id', test_customer.update());
server.patch('/test_customer/:id', test_customer.update());
server.del('/test_customer/:id', test_customer.remove());
server.get('/test_customer/:search/:option', function(req, res, next) {
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
    test_customerModel.find(query)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
})
 
server.get('/custinv', function(req, res, next){
    //var groupQuery = {_id:"$Invoices.custid", Count: { $sum: 1 } , Sum: { $sum: "$Invoices.amount" } , Average: { $avg: "$Invoices.amount" } };
    var projectQuery = {_id:1, name:1,comment:1, Count: { $sum: 1 } , Sum: { $sum: "$Invoices.amount" } , Average: { $avg: "$Invoices.amount" }};
    test_customerModel.aggregate()
        .lookup({ from: "test_invoices", localField: "_id", foreignField: "custid", as: "Invoices" })
        //.group(groupQuery)
        .project(projectQuery)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
   //res.send('hello ' + req.params.ppp);
});
server.get('/custinv/:id', function(req, res, next){
    var matchQuery = {'_id': mongoose.Types.ObjectId(req.params.id)};
    var lookupQuery = { from: "test_invoices", localField: "_id", foreignField: "custid", as: "Invoices" };
    //var groupQuery = {_id:null, Count: { $sum: 1 } , Sum: { $sum: "$amount" } , avgQuantity: { $avg: "$amount" } };
    var groupQuery = {_id:"$custid", Count: { $sum: 1 } , Sum: { $sum: "$amount" } , Average: { $avg: "$amount" } };
    //var projectQuery = {"Cust":"$Invoices.custid", "total":"$Invoices.amount", _id:0};
    test_customerModel.aggregate().match(matchQuery).lookup(lookupQuery)
        //.group(groupQuery)
        //.project(projectQuery)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
    //res.send('hello ' + req.params.ppp);
});