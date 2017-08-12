'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var VendorPaymentSchema = new mongoose.Schema({
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    PurchaseInvoiceId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseInvoice' },
    GeneralLedgerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    Date  : { type: Date },
    Amount:{type:Number},
    //TODO Vendor
    //TODO GeneralLedger
    //TODO PurchaseInvoice
});
VendorPaymentSchema.plugin(mongooseApiQuery)
VendorPaymentSchema.plugin(createdModified, { index: true })
 
var VendorPaymentModel = mongoose.model('VendorPayment', VendorPaymentSchema);
var VendorPayment = restifyMongoose(VendorPaymentModel);
server.post('VendorPayment', VendorPayment.insert());
server.put('/VendorPayment/:id', VendorPayment.update());
server.del('/VendorPayment/:id', VendorPayment.remove());
server.get('/VendorPayment', VendorPayment.query());
server.get('/VendorPayment/:id', VendorPayment.detail());