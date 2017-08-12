'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
const ItemSchema = new mongoose.Schema({
    ItemCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemCategory' },
    SmallestMeasurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    SellMeasurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    PurchaseMeasurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    PreferredVendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    ItemTaxGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemTaxGroupTax' },
    SalesAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    InventoryAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    CostOfGoodsSoldAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    InventoryAdjustmentAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryControlJournal' },
    No : { type : String },
    Code : { type : String, required : true },
    Description: { type: String },
    PurchaseDescription: { type: String },
    SellDescription: { type: String },
    Cost:   { type:Number },
    Price:  { type:Number },
    QuantityOnHand: { type:Number },
    Measurement: { type: String },
    //TODO: ItemCategory 
    //TODO: ItemTaxGroup 
    //TODO: PreferredVendor 
    //TODO: InventoryAccount 
    //TODO: SalesAccount 
    //TODO: CostOfGoodsSoldAccount 
    //TODO: InventoryAdjustmentAccount 
    //TODO: SmallestMeasurement 
    //TODO: SellMeasurement 
    //TODO: PurchaseMeasurement 

    //TODO: SalesInvoiceLines 
    //TODO: PurchaseOrderLines 
    //TODO: PurchaseReceiptLines 
    //TODO: PurchaseInvoiceLines 
    //TODO: InventoryControlJournals  
});
ItemSchema.plugin(mongooseApiQuery)
ItemSchema.plugin(createdModified, { index: true })
var ItemModel = mongoose.model('Item', ItemSchema);
var Item = restifyMongoose(ItemModel);
server.post('/Item', Item.insert());
server.put('/Item/:id', Item.update());
server.del('/Item/:id', Item.remove());
server.get('/Item', Item.query());
server.get('/Item/:id', Item.detail());