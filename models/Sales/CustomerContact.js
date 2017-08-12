'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var CustomerContactSchema = new mongoose.Schema({
    ContactId : { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    CustomerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    //TODO Contact
    //TODO Customer
});
CustomerContactSchema.plugin(mongooseApiQuery)
CustomerContactSchema.plugin(createdModified, { index: true })
 
var CustomerContactModel = mongoose.model('CustomerContact', CustomerContactSchema);
var CustomerContact = restifyMongoose(CustomerContactModel);
server.post('CustomerContact', CustomerContact.insert());
server.put('/CustomerContact/:id', CustomerContact.update());
server.del('/CustomerContact/:id', CustomerContact.remove());
server.get('/CustomerContact', CustomerContact.query());
server.get('/CustomerContact/:id', CustomerContact.detail());