'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesOrderLineSchema = new mongoose.Schema({
    SalesOrderId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO SalesOrder
    //TODO Item
    //TODO Measurement
});
SalesOrderLineSchema.plugin(mongooseApiQuery)
SalesOrderLineSchema.plugin(createdModified, { index: true })
 
var SalesOrderLineModel = mongoose.model('SalesOrderLine', SalesOrderLineSchema);
var SalesOrderLine = restifyMongoose(SalesOrderLineModel);
server.post('/SalesOrderLine', SalesOrderLine.insert());
server.put('/SalesOrderLine/:id', SalesOrderLine.update());
server.del('/SalesOrderLine/:id', SalesOrderLine.remove());
server.get('/SalesOrderLine', SalesOrderLine.query());
server.get('/SalesOrderLine/:id', SalesOrderLine.detail());