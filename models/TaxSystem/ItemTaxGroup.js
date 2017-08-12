'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var ItemTaxGroupSchema = new mongoose.Schema({
    Name : { type : String, required : true },
    IsFullyExempt : { type: Boolean },
    //TODO: ItemTaxGroupTax
});
ItemTaxGroupSchema.plugin(mongooseApiQuery)
ItemTaxGroupSchema.plugin(createdModified, { index: true })
 
var ItemTaxGroupModel = mongoose.model('ItemTaxGroup', ItemTaxGroupSchema);
var ItemTaxGroup = restifyMongoose(ItemTaxGroupModel);
server.post('/ItemTaxGroup', ItemTaxGroup.insert());
server.put('/ItemTaxGroup/:id', ItemTaxGroup.update());
server.del('/ItemTaxGroup/:id', ItemTaxGroup.remove());
server.get('/ItemTaxGroup', ItemTaxGroup.query());
server.get('/ItemTaxGroup/:id', ItemTaxGroup.detail());