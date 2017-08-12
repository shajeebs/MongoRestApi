'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin

var InventoryControlJournalSchema = new mongoose.Schema({
    ItemId : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    DocumentTypes : { type : String },
    INQty : { type : String, required : true },
    OUTQty : { type : String, required : true },
    Date : { type : String, required : true },
    TotalCost : { type : String, required : true },
    TotalAmount : { type : String, required : true },
    IsReverse : { type : String, required : true },
    //TODO: Item 
    //TODO: Measurement 
});
InventoryControlJournalSchema.plugin(mongooseApiQuery)
InventoryControlJournalSchema.plugin(createdModified, { index: true })
 
var InventoryControlJournalModel = mongoose.model('InventoryControlJournal', InventoryControlJournalSchema);
var InventoryControlJournal = restifyMongoose(InventoryControlJournalModel);
server.post('InventoryControlJournal', InventoryControlJournal.insert());
server.put('/InventoryControlJournal/:id', InventoryControlJournal.update());
server.del('/InventoryControlJournal/:id', InventoryControlJournal.remove());
server.get('/InventoryControlJournal', InventoryControlJournal.query());
server.get('/InventoryControlJournal/:id', InventoryControlJournal.detail());