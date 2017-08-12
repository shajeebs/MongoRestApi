'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var AccountSchema = new mongoose.Schema({
    AccountClassId : { type: mongoose.Schema.Types.ObjectId, ref: 'AccountClass' },
    ParentAccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    DrOrCrSide : { type : Number, required : true },
    CompanyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    AccountCode : { type : String, required : true },
    AccountName : { type : String, required : true },
    Description : { type : String },
    IsCash :  { type:Boolean },
    IsContraAccount :  { type:Boolean },
    //TODO ParentAccount
    //TODO AccountClass
    //TODO Company
    //TODO ChildAccounts
    //TODO ContraAccounts
    //TODO GeneralLedgerLines
});
AccountSchema.plugin(mongooseApiQuery)
AccountSchema.plugin(createdModified, { index: true })
 
var AccountModel = mongoose.model('Account', AccountSchema);
var Account = restifyMongoose(AccountModel);
server.post('/Account', Account.insert());
server.put('/Account/:id', Account.update());
server.del('/Account/:id', Account.remove());
server.get('/Account', Account.query());
server.get('/Account/:id', Account.detail());
server.get('/Account_INC', function(req, res, next){
    var lookupAcClasses = { from: "accountclasses", localField: "AccountClassId", foreignField: "_id", as: "AccountClasses" };
    var lookupChildAccounts = { from: "accounts", localField: "_id", foreignField: "ParentAccountId", as: "ChildAccounts" };
    var lookupMainContraAccounts = { from: "maincontraaccounts", localField: "_id", foreignField: "MainAccountId", as: "ContraAccounts" };
    //var lookupMainContraAccountsFull = { from: "accounts", localField: "_id", foreignField: "MainAccountId", as: "ContraAccounts" };
    AccountModel.aggregate().lookup(lookupAcClasses).lookup(lookupChildAccounts).lookup(lookupMainContraAccounts)
    //.unwind("ContraAccounts")
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc.length())
            next()
            //res.send('hello ' + doc.AccountClasses);
        });
});