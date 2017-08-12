'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PartySchema = new mongoose.Schema({
    Name : { type : String, required : true },
    Email : { type : String },
   Website  : { type : String },
    Phone  : { type : String },
    Fax  : { type : String },
});
PartySchema.plugin(mongooseApiQuery)
PartySchema.plugin(createdModified, { index: true })
 
var PartyModel = mongoose.model('Party', PartySchema);
var Party = restifyMongoose(PartyModel);
server.post('/Party', Party.insert());
server.put('/Party/:id', Party.update());
server.del('/Party/:id', Party.remove());
server.get('/Party', Party.query());
server.get('/Party/:id', Party.detail());
 