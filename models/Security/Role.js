'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var RoleSchema = new mongoose.Schema({
    Name : { type : String, required : true },
    DisplayName : { type : String },
    SysAdmin : { type : Boolean },
    System : { type : Boolean },
    //TODO Users
    //TODO Permissions
});
RoleSchema.plugin(mongooseApiQuery)
RoleSchema.plugin(createdModified, { index: true })
 
var RoleModel = mongoose.model('Role', RoleSchema);
var Role = restifyMongoose(RoleModel);
server.post('/Role', Role.insert());
server.put('/Role/:id', Role.update());
server.del('/Role/:id', Role.remove());
server.get('/Role', Role.query());
server.get('/Role/:id', Role.detail());