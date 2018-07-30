'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseReceiptSchema = new mongoose.Schema({
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    GeneralLedgerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    No : { type : String, required : true },
    Date : { type : Date, required : true },
    //TODO:GeneralLedger
    //TODO:Vendor
});
PurchaseReceiptSchema.plugin(mongooseApiQuery)
PurchaseReceiptSchema.plugin(createdModified, { index: true })
 
var PurchaseReceiptModel = mongoose.model('PurchaseReceipt', PurchaseReceiptSchema);
var PurchaseReceipt = restifyMongoose(PurchaseReceiptModel);
server.post('/PurchaseReceipt', PurchaseReceipt.insert());
server.put('/PurchaseReceipt/:id', PurchaseReceipt.update());
server.del('/PurchaseReceipt/:id', PurchaseReceipt.remove());
server.get('/PurchaseReceipt', PurchaseReceipt.query());
server.get('/PurchaseReceipt/:id', PurchaseReceipt.detail());