'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesInvoiceSchema = new mongoose.Schema({
   CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    GeneralLedgerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    No : { type : String, required : true },
    Date : { type : Date, required : true },
    ShippingHandlingCharge : { type : Number },
    StatusId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    ReferenceNo : { type : String },
});
SalesInvoiceSchema.plugin(mongooseApiQuery)
SalesInvoiceSchema.plugin(createdModified, { index: true })
 
var SalesInvoiceModel = mongoose.model('SalesInvoice', SalesInvoiceSchema);
var SalesInvoice = restifyMongoose(SalesInvoiceModel);
server.post('SalesInvoice', SalesInvoice.insert());
server.put('/SalesInvoice/:id', SalesInvoice.update());
server.del('/SalesInvoice/:id', SalesInvoice.remove());
server.get('/SalesInvoice', SalesInvoice.query());
server.get('/SalesInvoice/:id', SalesInvoice.detail());