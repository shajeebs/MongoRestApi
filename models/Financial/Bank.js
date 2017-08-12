'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var BankSchema = new mongoose.Schema({
    Type : { type : String, required : true },//CheckingAccount = 1, SavingsAccount, CashAccount
    Name : { type : String, required : true },
    AccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    BankAccountNo : { type : String, required : true },
    BankName : { type : String, required : true },
    IfsCode : { type : String, required : true },
    Branch : { type : String, required : true },
    IsDefault:{ type : Boolean },
    IsActive:{ type : Boolean },
    //TODO Account
});
BankSchema.plugin(mongooseApiQuery)
BankSchema.plugin(createdModified, { index: true })
 
var BankModel = mongoose.model('Bank', BankSchema);
var Bank = restifyMongoose(BankModel);
server.post('/Bank', Bank.insert());
server.put('/Bank/:id', Bank.update());
server.del('/Bank/:id', Bank.remove());
server.get('/Bank', Bank.query());
server.get('/Bank/:id', Bank.detail());