'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const ItemCategorySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    ItemType: { type: Number }, //Manufactured = 1,Purchased, Service, Charge
    MeasurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    SalesAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    InventoryAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    CostOfGoodsSoldAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    AdjustmentAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    AssemblyAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
});
ItemCategorySchema.plugin(mongooseApiQuery)
ItemCategorySchema.plugin(createdModified, { index: true })
var ItemCategoryModel = mongoose.model('ItemCategory', ItemCategorySchema);
var ItemCategory = restifyMongoose(ItemCategoryModel);
server.post('/ItemCategory', ItemCategory.insert());
server.put('/ItemCategory/:id', ItemCategory.update());
server.del('/ItemCategory/:id', ItemCategory.remove());
server.get('/ItemCategory', ItemCategory.query());
server.get('/ItemCategory/:id', ItemCategory.detail());
 