'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var JournalEntrySchema = new mongoose.Schema({
    GeneralLedgerId : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    PartyId : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    VoucherType : { type : Number },//OpeningBalances = 1, ClosingEntries, AdjustmentEntries,CorrectionEntries,TransferEntries = 5,
    Date : { type : Date },
    ReferenceNo : { type : String, required : true },
    Memo : { type : String},
    Posted :{ type : Boolean },
    ReadyForPosting :{ type : Boolean },
    DebitAmount :{ type : Number }, //GetDebitAmount();
    CreditAmount :{ type : Number },//GetCreditAmount();
    //TODO: GeneralLedgers
    //TODO: Parties
    //TODO: GeneralLedger
    //TODO: Party
    //TODO: JournalEntryLines
});
JournalEntrySchema.plugin(mongooseApiQuery)
JournalEntrySchema.plugin(createdModified, { index: true })
 
var JournalEntryModel = mongoose.model('JournalEntry', JournalEntrySchema);
var JournalEntry = restifyMongoose(JournalEntryModel);
server.post('/JournalEntry', JournalEntry.insert());
server.put('/JournalEntry/:id', JournalEntry.update());
server.del('/JournalEntry/:id', JournalEntry.remove());
server.get('/JournalEntry', JournalEntry.query());
server.get('/JournalEntry/:id', JournalEntry.detail());