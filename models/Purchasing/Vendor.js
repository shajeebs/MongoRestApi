'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var VendorSchema = new mongoose.Schema({
    No  : { type: String },
    PartyId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    AccountsPayableAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PurchaseAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PurchaseDiscountAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PrimaryContactId : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    TaxGroupId  : { type: mongoose.Schema.Types.ObjectId, ref: 'TaxGroup' },
    //TODO Party
    //TODO AccountsPayableAccount 
    //TODO PurchaseAccount
    //TODO PurchaseDiscountAccount
    //TODO PrimaryContact
    //TODO PaymentTerm
    //TODO TaxGroup

    //TODO PurchaseOrders
    //TODO PurchaseReceipts
    //TODO PurchaseInvoices
    //TODO VendorPayments
    //TODO VendorContact
});
VendorSchema.plugin(mongooseApiQuery)
VendorSchema.plugin(createdModified, { index: true })
 
var VendorModel = mongoose.model('Vendor', VendorSchema);
var Vendor = restifyMongoose(VendorModel);
server.post('Vendor', Vendor.insert());
server.put('/Vendor/:id', Vendor.update());
server.del('/Vendor/:id', Vendor.remove());
server.get('/Vendor', Vendor.query());
server.get('/Vendor/:id', Vendor.detail());