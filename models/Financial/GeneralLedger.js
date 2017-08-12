'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var GeneralLedgerSchema = new mongoose.Schema({
    Date : { type : Date, required : true },
    DocumentType:{ type : Number},
    //SalesQuote = 1, SalesOrder, SalesDelivery, SalesInvoice, SalesReceipt, SalesDebitMemo, SalesCreditMemo,
    //PurchaseOrder, PurchaseReceipt, PurchaseInvoice, PurchaseDebitMemo, PurchaseCreditMemo, PurchaseInvoicePayment,
    //JournalEntry, CustomerAllocation
    Description : { type : String},
    AccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    DrCr : { type : Number},//NA = 0, Dr = 1, Cr = 2
    Amount : { type : Number},
    //TODO: PurchaseOrderReceipts
    //TODO: GeneralLedgerLines
});
GeneralLedgerSchema.plugin(mongooseApiQuery)
GeneralLedgerSchema.plugin(createdModified, { index: true })
 
var GeneralLedgerModel = mongoose.model('GeneralLedger', GeneralLedgerSchema);
var GeneralLedger = restifyMongoose(GeneralLedgerModel);
server.post('/GeneralLedger', GeneralLedger.insert());
server.put('/GeneralLedger/:id', GeneralLedger.update());
server.del('/GeneralLedger/:id', GeneralLedger.remove());
server.get('/GeneralLedger', GeneralLedger.query());
server.get('/GeneralLedger/:id', GeneralLedger.detail());