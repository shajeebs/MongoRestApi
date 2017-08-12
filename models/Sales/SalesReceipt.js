'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesReceiptSchema = new mongoose.Schema({
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    GeneralLedgerHeaderId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    AccountToDebitId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    No : { type : String, required : true },
    Date : { type : Date, required : true },
    Amount : { type : Number },
    Status  : { type: Number },
    //TODO Customer
    //TODO GeneralLedger
    //TODO AccountToDebit
    //TODO Customer
    //TODO Customer

    //TODO SalesReceiptLines
    //TODO SalesReceiptLines
});
SalesReceiptSchema.plugin(mongooseApiQuery)
SalesReceiptSchema.plugin(createdModified, { index: true })
 
var SalesReceiptModel = mongoose.model('SalesReceipt', SalesReceiptSchema);
var SalesReceipt = restifyMongoose(SalesReceiptModel);
server.post('SalesReceipt', SalesReceipt.insert());
server.put('/SalesReceipt/:id', SalesReceipt.update());
server.del('/SalesReceipt/:id', SalesReceipt.remove());
server.get('/SalesReceipt', SalesReceipt.query());
server.get('/SalesReceipt/:id', SalesReceipt.detail());