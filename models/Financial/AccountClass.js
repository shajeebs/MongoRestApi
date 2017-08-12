'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var AccountClassSchema = new mongoose.Schema({
    Name : { type : String },
    NormalBalance :  { type:String },
    //TODO Accounts
});
AccountClassSchema.plugin(mongooseApiQuery)
AccountClassSchema.plugin(createdModified, { index: true })
 
var AccountClassModel = mongoose.model('AccountClass', AccountClassSchema);
var AccountClass = restifyMongoose(AccountClassModel);
server.post('/AccountClass', AccountClass.insert());
server.put('/AccountClass/:id', AccountClass.update());
server.del('/AccountClass/:id', AccountClass.remove());
server.get('/AccountClass', AccountClass.query());
server.get('/AccountClass/:id', AccountClass.detail());