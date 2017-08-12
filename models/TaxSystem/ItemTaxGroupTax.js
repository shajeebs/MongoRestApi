'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var ItemTaxGroupTaxSchema = new mongoose.Schema({
    TaxId : { type: mongoose.Schema.Types.ObjectId, ref: 'Tax' },
    ItemTaxGroupId : { type: mongoose.Schema.Types.ObjectId, ref: 'ItemTaxGroup' },
    IsExempt :  { type:Boolean },
        //TODO: Tax
        //TODO:ItemTaxGroup
});
ItemTaxGroupTaxSchema.plugin(mongooseApiQuery)
ItemTaxGroupTaxSchema.plugin(createdModified, { index: true })
 
var ItemTaxGroupTaxModel = mongoose.model('ItemTaxGroupTax', ItemTaxGroupTaxSchema);
var ItemTaxGroupTax = restifyMongoose(ItemTaxGroupTaxModel);
server.post('/ItemTaxGroupTax', ItemTaxGroupTax.insert());
server.put('/ItemTaxGroupTax/:id', ItemTaxGroupTax.update());
server.del('/ItemTaxGroupTax/:id', ItemTaxGroupTax.remove());
server.get('/ItemTaxGroupTax', ItemTaxGroupTax.query());
server.get('/ItemTaxGroupTax/:id', ItemTaxGroupTax.detail());