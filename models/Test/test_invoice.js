'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var test_invoiceSchema = new mongoose.Schema({
  custid: { type: mongoose.Schema.Types.ObjectId, ref: 'test_customer' },
  amount: { type: Number, required: true }
})
test_invoiceSchema.plugin(mongooseApiQuery)
test_invoiceSchema.plugin(createdModified, { index: true })
var test_invoiceModel = mongoose.model('test_invoice', test_invoiceSchema)
 
/**
* Model Schema
* const Todo = require('../models/todo')
*/
var test_invoice = restifyMongoose(test_invoiceModel);
server.get('/test_invoice', test_invoice.query());
//server.get('/test_invoice/:id', test_invoice.detail());
server.post('/test_invoice', test_invoice.insert());
server.patch('/test_invoice/:id', test_invoice.update());
server.del('/test_invoice/:id', test_invoice.remove());
server.get('/test_invoice/:customerid', function(req, res, next) {
    var query = { custid: req.params.customerid };
    // test_invoiceModel.find(query, function(err, doc) { if (err) { log.error(err)
    //         return next(new errors.InvalidContentError(err.errors.name.message)) } res.json(doc) next() })
    test_invoiceModel.find(query)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
})
 
// db.test_invoice.aggregate([{$lookup: { from: "customer", localField: "customer", foreignField: "_id", as: "CD" }}]).pretty()
// db.test_invoice.aggregate([{$lookup: { from: "Customer", localField: "customer", foreignField: "_id", as: "CD" },
// $project: { "CD.name":1, "_id":0}}])
server.get('/inv1', function(req, res, next){
    test_invoiceModel.aggregate({
        $lookup: { from: "test_customers", localField: "custid", foreignField: "_id", as: "Customer" },
        },function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
    })
});
 
server.get('/inv2', function(req, res, next){
    var matchQuery = {'_id': mongoose.Types.ObjectId(req.params.id)};
    var lookupQuery = { from: "test_invoices", localField: "_id", foreignField: "custid", as: "Invoices" };
    //var groupQuery = {_id:null, Count: { $sum: 1 } , Sum: { $sum: "$amount" } , avgQuantity: { $avg: "$amount" } };
    var groupQuery = {_id:"$custid", Count: { $sum: 1 } , Sum: { $sum: "$amount" } , Average: { $avg: "$amount" } };
    var projectQuery = {"_id":1, "custid":1, "Count":1, "Sum":1, "Average":1};
    test_invoiceModel.aggregate()
        //.match(matchQuery).lookup(lookupQuery)
        .group(groupQuery)
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