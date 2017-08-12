'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var MeasurementSchema = new mongoose.Schema({
    Code : { type : String, required : true },
    Description : { type : String, required : true },
});
MeasurementSchema.plugin(mongooseApiQuery)
MeasurementSchema.plugin(createdModified, { index: true })
 
var MeasurementModel = mongoose.model('Measurement', MeasurementSchema);
var Measurement = restifyMongoose(MeasurementModel);
server.post('/Measurement', Measurement.insert());
server.put('/Measurement/:id', Measurement.update());
server.del('/Measurement/:id', Measurement.remove());
server.get('/Measurement', Measurement.query());
server.get('/Measurement/:id', Measurement.detail());