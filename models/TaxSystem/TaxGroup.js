'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var TaxGroupSchema = new mongoose.Schema({
    Description : { type : String, required : true },
    TaxAppliedToShipping : { type : Boolean },
    IsActive : { type : Boolean },
    //Taxes - TaxGroupTax
});
TaxGroupSchema.plugin(mongooseApiQuery)
TaxGroupSchema.plugin(createdModified, { index: true })
 
var TaxGroupModel = mongoose.model('TaxGroup', TaxGroupSchema);
var TaxGroup = restifyMongoose(TaxGroupModel);
server.post('/TaxGroup', TaxGroup.insert());
server.put('/TaxGroup/:id', TaxGroup.update());
server.patch('/TaxGroup/:id', TaxGroup.update());
server.del('/TaxGroup/:id', TaxGroup.remove());
server.get('/TaxGroup', TaxGroup.query());
server.get('/TaxGroup/:id', TaxGroup.detail());