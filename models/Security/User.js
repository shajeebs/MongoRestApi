'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var UserSchema = new mongoose.Schema({
    UserName : { type : String, required : true },
    EmailAddress : { type : String, required : true },
    Firstname : { type : String, required : true },
    Lastname : { type : String },
    //TODO Roles
});
UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })
 
var UserModel = mongoose.model('User', UserSchema);
var User = restifyMongoose(UserModel);
server.post('/User', User.insert());
server.put('/User/:id', User.update());
server.del('/User/:id', User.remove());
server.get('/User', User.query());
server.get('/User/:id', User.detail());