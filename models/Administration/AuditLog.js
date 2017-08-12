'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var AuditLogSchema = new mongoose.Schema({
    Name : { type : String, required : true },
});
AuditLogSchema.plugin(mongooseApiQuery)
AuditLogSchema.plugin(createdModified, { index: true })
 
var AuditLogModel = mongoose.model('AuditLog', AuditLogSchema);
var AuditLog = restifyMongoose(AuditLogModel);
server.post('/AuditLog', AuditLog.insert());
server.put('/AuditLog/:id', AuditLog.update());
server.del('/AuditLog/:id', AuditLog.remove());
server.get('/AuditLog', AuditLog.query());
server.get('/AuditLog/:id', AuditLog.detail());