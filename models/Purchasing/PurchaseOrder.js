'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseOrderSchema = new mongoose.Schema({
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    No : { type : String, required : true },
    Date : { type : Date, required : true },
    Description : { type : String,  },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    ReferenceNo  : { type : String },
    Status  : { type: Number },//Draft = 0, Open = 1, PartiallyReceived = 2, FullReceived = 3, Invoiced = 4, Closed = 5
    //TODO:Vendor
    //TODO:PurchaseOrderLines
});
PurchaseOrderSchema.plugin(mongooseApiQuery)
PurchaseOrderSchema.plugin(createdModified, { index: true })
 
var PurchaseOrderModel = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
var PurchaseOrder = restifyMongoose(PurchaseOrderModel);
server.post('/PurchaseOrder', PurchaseOrder.insert());
server.put('/PurchaseOrder/:id', PurchaseOrder.update());
server.del('/PurchaseOrder/:id', PurchaseOrder.remove());
server.get('/PurchaseOrder', PurchaseOrder.query());
server.get('/PurchaseOrder/:id', PurchaseOrder.detail());