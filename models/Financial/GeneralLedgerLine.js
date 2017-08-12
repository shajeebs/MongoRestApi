'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var GeneralLedgerLineSchema = new mongoose.Schema({
    GeneralLedgerId : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    AccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    DrCr : { type : Number},//NA = 0, Dr = 1, Cr = 2
    Amount : { type : Number},
    //TODO: Account
    //TODO: GeneralLedger
    //TODO: Accounts
    //TODO: GeneralLedgers
});
GeneralLedgerLineSchema.plugin(mongooseApiQuery)
GeneralLedgerLineSchema.plugin(createdModified, { index: true })
 
var GeneralLedgerLineModel = mongoose.model('GeneralLedgerLine', GeneralLedgerLineSchema);
var GeneralLedgerLine = restifyMongoose(GeneralLedgerLineModel);
server.post('/GeneralLedgerLine', GeneralLedgerLine.insert());
server.put('/GeneralLedgerLine/:id', GeneralLedgerLine.update());
server.del('/GeneralLedgerLine/:id', GeneralLedgerLine.remove());
server.get('/GeneralLedgerLine', GeneralLedgerLine.query());
server.get('/GeneralLedgerLine/:id', GeneralLedgerLine.detail());