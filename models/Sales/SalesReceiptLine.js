'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesReceiptLineSchema = new mongoose.Schema({
    SalesReceiptId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesReceipt' },
    SalesInvoiceLineId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesInvoiceLine' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    AccountToCreditId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    AmountPaid : { type : Number,  },
    //TODO SalesReceipt
    //TODO SalesInvoiceLine
    //TODO AccountToCredit
});
SalesReceiptLineSchema.plugin(mongooseApiQuery)
SalesReceiptLineSchema.plugin(createdModified, { index: true })
 
var SalesReceiptLineModel = mongoose.model('SalesReceiptLine', SalesReceiptLineSchema);
var SalesReceiptLine = restifyMongoose(SalesReceiptLineModel);
server.post('SalesReceiptLine', SalesReceiptLine.insert());
server.put('/SalesReceiptLine/:id', SalesReceiptLine.update());
server.del('/SalesReceiptLine/:id', SalesReceiptLine.remove());
server.get('/SalesReceiptLine', SalesReceiptLine.query());
server.get('/SalesReceiptLine/:id', SalesReceiptLine.detail());