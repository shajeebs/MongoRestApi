'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var TaxSchema = new mongoose.Schema({
    SalesAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PurchasingAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    TaxCode : { type : String, required : true },
    TaxName : { type : String, required : true },
    Rate :  { type:Number, required : true },
    IsActive :  { type:Boolean },
    //TODO: SalesAccount
    //TODO: PurchasingAccount
    //TODO: TaxGroupTaxes
    //TODO: ItemTaxGroupTaxes
});
TaxSchema.plugin(mongooseApiQuery)
TaxSchema.plugin(createdModified, { index: true })
 
var TaxModel = mongoose.model('Tax', TaxSchema);
var Tax = restifyMongoose(TaxModel);
server.post('/Tax', Tax.insert());
server.put('/Tax/:id', Tax.update());
server.del('/Tax/:id', Tax.remove());
server.get('/Tax', Tax.query());
server.get('/Tax/:id', Tax.detail());