'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PaymentTermSchema = new mongoose.Schema({
    Method : { type : String },
    PaymentType  :  { type:String },
    DueAfterDays  :  { type:Number },
    IsActive :  { type:Boolean },   
});
PaymentTermSchema.plugin(mongooseApiQuery)
PaymentTermSchema.plugin(createdModified, { index: true })
 
var PaymentTermModel = mongoose.model('PaymentTerm', PaymentTermSchema);
var PaymentTerm = restifyMongoose(PaymentTermModel);
server.post('/PaymentTerm', PaymentTerm.insert());
server.put('/PaymentTerm/:id', PaymentTerm.update());
server.del('/PaymentTerm/:id', PaymentTerm.remove());
server.get('/PaymentTerm', PaymentTerm.query());
server.get('/PaymentTerm/:id', PaymentTerm.detail());