'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var CustomerAllocationSchema = new mongoose.Schema({
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    SalesInvoiceId : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesInvoice' },
    SalesReceiptId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesReceipt' },
    Date  : { type: Date },
    Amount:{type:Number},

    //TODO Customer
    //TODO SalesInvoice
    //TODO SalesReceipt
});
CustomerAllocationSchema.plugin(mongooseApiQuery)
CustomerAllocationSchema.plugin(createdModified, { index: true })
 
var CustomerAllocationModel = mongoose.model('CustomerAllocation', CustomerAllocationSchema);
var CustomerAllocation = restifyMongoose(CustomerAllocationModel);
server.post('CustomerAllocation', CustomerAllocation.insert());
server.put('/CustomerAllocation/:id', CustomerAllocation.update());
server.del('/CustomerAllocation/:id', CustomerAllocation.remove());
server.get('/CustomerAllocation', CustomerAllocation.query());
server.get('/CustomerAllocation/:id', CustomerAllocation.detail());