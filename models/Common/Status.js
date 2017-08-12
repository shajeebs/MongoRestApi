'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
   createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var StatusSchema = new mongoose.Schema({
    Description : { type : String, required : true },
});
StatusSchema.plugin(mongooseApiQuery)
StatusSchema.plugin(createdModified, { index: true })
 
var StatusModel = mongoose.model('Status', StatusSchema);
var Status = restifyMongoose(StatusModel);
server.post('/Status', Status.insert());
server.put('/Status/:id', Status.update());
server.del('/Status/:id', Status.remove());
server.get('/Status', Status.query());
server.get('/Status/:id', Status.detail());