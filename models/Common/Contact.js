'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var ContactSchema = new mongoose.Schema({
    CompanyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    FirstName : { type : String, required : true },
    MiddleName : { type : String},
    LastName : { type : String},
    PartyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    CustomerId : { type: mongoose.Schema.Types.ObjectId, ref: '' },
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: '' },
    HoldingPartyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
    HoldingPartyType:{ type : Boolean }, //1/true = customer, 2/false = vendor
    //TODO: Party
});
ContactSchema.plugin(mongooseApiQuery)
ContactSchema.plugin(createdModified, { index: true })
 
var ContactModel = mongoose.model('Contact', ContactSchema);
var Contact = restifyMongoose(ContactModel);
server.post('/Contact', Contact.insert());
server.put('/Contact/:id', Contact.update());
server.del('/Contact/:id', Contact.remove());
server.get('/Contact', Contact.query());
server.get('/Contact/:id', Contact.detail());