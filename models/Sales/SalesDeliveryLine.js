'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesDeliveryLineSchema = new mongoose.Schema({
    SalesDeliveryId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesDelivery' },
    SalesInvoiceLineId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesInvoiceLine' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    Price : { type : Number,  },
    Discount : { type : Number,  },
    //TODO SalesDelivery
    //TODO SalesInvoiceLine
    //TODO Item
    //TODO Measurement
});
SalesDeliveryLineSchema.plugin(mongooseApiQuery)
SalesDeliveryLineSchema.plugin(createdModified, { index: true })
 
var SalesDeliveryLineModel = mongoose.model('SalesDeliveryLine', SalesDeliveryLineSchema);
var SalesDeliveryLine = restifyMongoose(SalesDeliveryLineModel);
server.post('SalesDeliveryLine', SalesDeliveryLine.insert());
server.put('/SalesDeliveryLine/:id', SalesDeliveryLine.update());
server.del('/SalesDeliveryLine/:id', SalesDeliveryLine.remove());
server.get('/SalesDeliveryLine', SalesDeliveryLine.query());
server.get('/SalesDeliveryLine/:id', SalesDeliveryLine.detail());