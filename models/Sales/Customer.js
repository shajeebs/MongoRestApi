'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var CustomerSchema = new mongoose.Schema({
    No : { type : String, required : true },
    PartyId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    PrimaryContactId : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    TaxGroupId  : { type: mongoose.Schema.Types.ObjectId, ref: 'TaxGroup' },
    AccountsReceivableAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    SalesAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    SalesDiscountAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    CustomerAdvancesAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PromptPaymentDiscountAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    //TODO Party
    //TODO TaxGroup
    //TODO AccountsReceivableAccount
    //TODO SalesAccount
    //TODO SalesDiscountAccount
    //TODO PromptPaymentDiscountAccount
    //TODO PrimaryContact
    //TODO PaymentTerm
    //TODO CustomerAdvancesAccount

    //TODO SalesInvoices
    //TODO SalesReceipts
    //TODO SalesOrders
    //TODO CustomerAllocations
    //TODO CustomerContact
});
CustomerSchema.plugin(mongooseApiQuery)
CustomerSchema.plugin(createdModified, { index: true })
 
var CustomerModel = mongoose.model('Customer', CustomerSchema);
var Customer = restifyMongoose(CustomerModel);
server.post('/Customer', Customer.insert());
server.put('/Customer/:id', Customer.update());
server.del('/Customer/:id', Customer.remove());
server.get('/Customer', Customer.query());
server.get('/Customer/:id', Customer.detail());