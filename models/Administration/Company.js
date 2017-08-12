'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var CompanySchema = new mongoose.Schema({
    CompanyCode : { type : String, required : true },
    Name : { type : String, required : true },
    ShortName  : { type : String, required : true },
    Logo  : { data: Buffer, contentType: String }, //Need to check datatype for storing images
});
CompanySchema.plugin(mongooseApiQuery)
CompanySchema.plugin(createdModified, { index: true })
 
var CompanyModel = mongoose.model('Company', CompanySchema);
var Company = restifyMongoose(CompanyModel);
server.post('/Company', Company.insert());
server.put('/Company/:id', Company.update());
server.del('/Company/:id', Company.remove());
server.get('/Company', Company.query());
server.get('/Company/:id', Company.detail());