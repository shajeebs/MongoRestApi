'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var MasterGeneralLedgerSchema = new mongoose.Schema({
    AccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    CurrencyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
    DocumentType : { type: Number },
    TransactionNo : { type: String },
    AccountCode : { type: String },
    AccountName : { type: String },
    Date : { type: Date },
    Debit : { type: Number },
    Credit : { type: Number },
    //TODO: Account
    //TODO: Currency
});
MasterGeneralLedgerSchema.plugin(mongooseApiQuery)
MasterGeneralLedgerSchema.plugin(createdModified, { index: true })
 
var MasterGeneralLedgerModel = mongoose.model('MasterGeneralLedger', MasterGeneralLedgerSchema);
var MasterGeneralLedger = restifyMongoose(MasterGeneralLedgerModel);
server.post('/MasterGeneralLedger', MasterGeneralLedger.insert());
server.put('/MasterGeneralLedger/:id', MasterGeneralLedger.update());
server.del('/MasterGeneralLedger/:id', MasterGeneralLedger.remove());
server.get('/MasterGeneralLedger', MasterGeneralLedger.query());
server.get('/MasterGeneralLedger/:id', MasterGeneralLedger.detail());