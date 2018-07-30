'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var VendorContactSchema = new mongoose.Schema({
    ContactId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    //TODO Vendor
    //TODO Contact
});
VendorContactSchema.plugin(mongooseApiQuery)
VendorContactSchema.plugin(createdModified, { index: true })
 
var VendorContactModel = mongoose.model('VendorContact', VendorContactSchema);
var VendorContact = restifyMongoose(VendorContactModel);
server.post('/VendorContact', VendorContact.insert());
server.put('/VendorContact/:id', VendorContact.update());
server.del('/VendorContact/:id', VendorContact.remove());
server.get('/VendorContact', VendorContact.query());
server.get('/VendorContact/:id', VendorContact.detail());