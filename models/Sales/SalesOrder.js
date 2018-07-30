'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesOrderSchema = new mongoose.Schema({
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    No : { type : String, required : true },
    ReferenceNo : { type : String, required : true },
    Date : { type : Date, required : true },
    Status  : { type: Number },
    //TODO Customer
    //TODO PaymentTerm
    //TODO SalesOrderLines
});
SalesOrderSchema.plugin(mongooseApiQuery)
SalesOrderSchema.plugin(createdModified, { index: true })
 
var SalesOrderModel = mongoose.model('SalesOrder', SalesOrderSchema);
var SalesOrder = restifyMongoose(SalesOrderModel);
server.post('/SalesOrder', SalesOrder.insert());
server.put('/SalesOrder/:id', SalesOrder.update());
server.del('/SalesOrder/:id', SalesOrder.remove());
server.get('/SalesOrder', SalesOrder.query());
server.get('/SalesOrder/:id', SalesOrder.detail());