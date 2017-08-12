'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var GroupSchema = new mongoose.Schema({
    Name : { type : String, required : true },
    DisplayName : { type : String },
    //TODO Permissions
});
GroupSchema.plugin(mongooseApiQuery)
GroupSchema.plugin(createdModified, { index: true })
 
var GroupModel = mongoose.model('Group', GroupSchema);
var Group = restifyMongoose(GroupModel);
server.post('Group', Group.insert());
server.put('/Group/:id', Group.update());
server.del('/Group/:id', Group.remove());
server.get('/Group', Group.query());
server.get('/Group/:id', Group.detail());