'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var TaxGroupTaxSchema = new mongoose.Schema({
    TaxId : { type: mongoose.Schema.Types.ObjectId, ref: 'Tax' },
    TaxGroupId : { type: mongoose.Schema.Types.ObjectId, ref: 'TaxGroup' },
        //TODO: Tax
        //TODO:TaxGroup
});
TaxGroupTaxSchema.plugin(mongooseApiQuery)
TaxGroupTaxSchema.plugin(createdModified, { index: true })
 
var TaxGroupTaxModel = mongoose.model('TaxGroupTax', TaxGroupTaxSchema);
var TaxGroupTax = restifyMongoose(TaxGroupTaxModel);
server.post('/TaxGroupTax', TaxGroupTax.insert());
server.put('/TaxGroupTax/:id', TaxGroupTax.update());
server.del('/TaxGroupTax/:id', TaxGroupTax.remove());
server.get('/TaxGroupTax', TaxGroupTax.query());
server.get('/TaxGroupTax/:id', TaxGroupTax.detail());