'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseReceiptLineSchema = new mongoose.Schema({
    PurchaseReceiptId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseReceipt' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    InventoryControlJournalId  : { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryControlJournal' },
    PurchaseInvoiceLineId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseInvoiceLine' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    ReceivedQuantity : { type : Number,  },
    Cost : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO:PurchaseReceipt
    //TODO:Item
    //TODO:Measurement
    //TODO:InventoryControlJournal
    //TODO:PurchaseInvoiceLine
});
PurchaseReceiptLineSchema.plugin(mongooseApiQuery)
PurchaseReceiptLineSchema.plugin(createdModified, { index: true })
 
var PurchaseReceiptLineModel = mongoose.model('PurchaseReceiptLine', PurchaseReceiptLineSchema);
var PurchaseReceiptLine = restifyMongoose(PurchaseReceiptLineModel);
server.post('/PurchaseReceiptLine', PurchaseReceiptLine.insert());
server.put('/PurchaseReceiptLine/:id', PurchaseReceiptLine.update());
server.del('/PurchaseReceiptLine/:id', PurchaseReceiptLine.remove());
server.get('/PurchaseReceiptLine', PurchaseReceiptLine.query());
server.get('/PurchaseReceiptLine/:id', PurchaseReceiptLine.detail());