'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var UserRoleSchema = new mongoose.Schema({
    UserId  : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    RoleId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    //TODO User
    //TODO Role
});
UserRoleSchema.plugin(mongooseApiQuery)
UserRoleSchema.plugin(createdModified, { index: true })
 
var UserRoleModel = mongoose.model('UserRole', UserRoleSchema);
var UserRole = restifyMongoose(UserRoleModel);
server.post('/UserRole', UserRole.insert());
server.put('/UserRole/:id', UserRole.update());
server.del('/UserRole/:id', UserRole.remove());
server.get('/UserRole', UserRole.query());
server.get('/UserRole/:id', UserRole.detail());