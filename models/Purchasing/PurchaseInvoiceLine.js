'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseInvoiceLineSchema = new mongoose.Schema({
    PurchaseInvoiceId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseInvoice' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    InventoryControlJournalId  : { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryControlJournal' },
    PurchaseOrderLineId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrderLine' },
    Quantity : { type : Number,  },
    ReceivedQuantity : { type : Number,  },
    Cost : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO:PurchaseInvoice
    //TODO:Item
    //TODO:Measurement
    //TODO:InventoryControlJournal
    //TODO:PurchaseOrderLine
});
PurchaseInvoiceLineSchema.plugin(mongooseApiQuery)
PurchaseInvoiceLineSchema.plugin(createdModified, { index: true })
 
var PurchaseInvoiceLineModel = mongoose.model('PurchaseInvoiceLine', PurchaseInvoiceLineSchema);
var PurchaseInvoiceLine = restifyMongoose(PurchaseInvoiceLineModel);
server.post('PurchaseInvoiceLine', PurchaseInvoiceLine.insert());
server.put('/PurchaseInvoiceLine/:id', PurchaseInvoiceLine.update());
server.del('/PurchaseInvoiceLine/:id', PurchaseInvoiceLine.remove());
server.get('/PurchaseInvoiceLine', PurchaseInvoiceLine.query());
server.get('/PurchaseInvoiceLine/:id', PurchaseInvoiceLine.detail());