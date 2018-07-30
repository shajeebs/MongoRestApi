'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesQuoteSchema = new mongoose.Schema({
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    No : { type : String, required : true },
    ReferenceNo : { type : String, required : true },
    Date : { type : Date, required : true },
    Status  : { type: Number },//TODO Draft = 0, Open = 1, Overdue = 2, Closed = 3, Void = 4,
    //TODO Customer
    //TODO SalesQuoteLines
});
SalesQuoteSchema.plugin(mongooseApiQuery)
SalesQuoteSchema.plugin(createdModified, { index: true })
 
var SalesQuoteModel = mongoose.model('SalesQuote', SalesQuoteSchema);
var SalesQuote = restifyMongoose(SalesQuoteModel);
server.post('/SalesQuote', SalesQuote.insert());
server.put('/SalesQuote/:id', SalesQuote.update());
server.del('/SalesQuote/:id', SalesQuote.remove());
server.get('/SalesQuote', SalesQuote.query());
server.get('/SalesQuote/:id', SalesQuote.detail());