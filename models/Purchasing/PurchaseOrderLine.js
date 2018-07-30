'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseOrderLineSchema = new mongoose.Schema({
    PurchaseOrderId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrderId' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    Cost : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO:PurchaseOrder
    //TODO:Item 
    //TODO:Measurement
    //TODO:PurchaseInvoiceLines
});
PurchaseOrderLineSchema.plugin(mongooseApiQuery)
PurchaseOrderLineSchema.plugin(createdModified, { index: true })
 
var PurchaseOrderLineModel = mongoose.model('PurchaseOrderLine', PurchaseOrderLineSchema);
var PurchaseOrderLine = restifyMongoose(PurchaseOrderLineModel);
server.post('/PurchaseOrderLine', PurchaseOrderLine.insert());
server.put('/PurchaseOrderLine/:id', PurchaseOrderLine.update());
server.del('/PurchaseOrderLine/:id', PurchaseOrderLine.remove());
server.get('/PurchaseOrderLine', PurchaseOrderLine.query());
server.get('/PurchaseOrderLine/:id', PurchaseOrderLine.detail());