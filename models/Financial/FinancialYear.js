'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var FinancialYearSchema = new mongoose.Schema({
    FiscalYearCode : { type : String, required : true },
    FiscalYearName : { type : String, required : true },
    StartDate : { type : Date, required : true },
    EndDate : { type : Date, required : true },
    IsActive:{ type : Boolean },
});
FinancialYearSchema.plugin(mongooseApiQuery)
FinancialYearSchema.plugin(createdModified, { index: true })
 
var FinancialYearModel = mongoose.model('FinancialYear', FinancialYearSchema);
var FinancialYear = restifyMongoose(FinancialYearModel);
server.post('/FinancialYear', FinancialYear.insert());
server.put('/FinancialYear/:id', FinancialYear.update());
server.del('/FinancialYear/:id', FinancialYear.remove());
server.get('/FinancialYear', FinancialYear.query());
server.get('/FinancialYear/:id', FinancialYear.detail());