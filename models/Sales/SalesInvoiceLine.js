'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesInvoiceLineSchema = new mongoose.Schema({
    SalesInvoiceId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesInvoice' },
    SalesOrderLineId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrderLine' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    InventoryControlJournalId  : { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryControlJournal' },
    Quantity : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO SalesDelivery
    //TODO Itemv
    //TODO Measurement
    //TODO InventoryControlJournal
    //TODO SalesOrderLine
    //TODO SalesReceiptLines
});
SalesInvoiceLineSchema.plugin(mongooseApiQuery)
SalesInvoiceLineSchema.plugin(createdModified, { index: true })
 
var SalesInvoiceLineModel = mongoose.model('SalesInvoiceLine', SalesInvoiceLineSchema);
var SalesInvoiceLine = restifyMongoose(SalesInvoiceLineModel);
server.post('SalesInvoiceLine', SalesInvoiceLine.insert());
server.put('/SalesInvoiceLine/:id', SalesInvoiceLine.update());
server.del('/SalesInvoiceLine/:id', SalesInvoiceLine.remove());
server.get('/SalesInvoiceLine', SalesInvoiceLine.query());
server.get('/SalesInvoiceLine/:id', SalesInvoiceLine.detail());