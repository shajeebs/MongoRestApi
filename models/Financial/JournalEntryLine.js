'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var JournalEntryLineSchema = new mongoose.Schema({
    JournalEntryId : { type: mongoose.Schema.Types.ObjectId, ref: 'JournalEntry' },
    AccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    DrCr : { type : Number},//NA = 0, Dr = 1, Cr = 2
    Amount : { type : Number},
    Memo : { type : String},
    //TODO: JournalEntry
    //TODO: Account
});
JournalEntryLineSchema.plugin(mongooseApiQuery)
JournalEntryLineSchema.plugin(createdModified, { index: true })
 
var JournalEntryLineModel = mongoose.model('JournalEntryLine', JournalEntryLineSchema);
var JournalEntryLine = restifyMongoose(JournalEntryLineModel);
server.post('/JournalEntryLine', JournalEntryLine.insert());
server.put('/JournalEntryLine/:id', JournalEntryLine.update());
server.del('/JournalEntryLine/:id', JournalEntryLine.remove());
server.get('/JournalEntryLine', JournalEntryLine.query());
server.get('/JournalEntryLine/:id', JournalEntryLine.detail());