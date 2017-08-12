'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesDeliverySchema = new mongoose.Schema({
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    GeneralLedgerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    No : { type : String, required : true },
    Date : { type : Date, required : true },
    Status  : { type: Number },
    //TODO PaymentTerm
    //TODO Customer
    //TODO GeneralLedger
    
    //TODO SalesDeliveryLines
});
SalesDeliverySchema.plugin(mongooseApiQuery)
SalesDeliverySchema.plugin(createdModified, { index: true })
 
var SalesDeliveryModel = mongoose.model('SalesDelivery', SalesDeliverySchema);
var SalesDelivery = restifyMongoose(SalesDeliveryModel);
server.post('SalesDelivery', SalesDelivery.insert());
server.put('/SalesDelivery/:id', SalesDelivery.update());
server.del('/SalesDelivery/:id', SalesDelivery.remove());
server.get('/SalesDelivery', SalesDelivery.query());
server.get('/SalesDelivery/:id', SalesDelivery.detail());