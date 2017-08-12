'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var CurrencySchema = new mongoose.Schema({
    Name : { type : String, required : true },
    Symbol : { type : String, required : true },
    Country : { type : String, required : true },
    Code : { type : String, required : true },
    ExchangeRate : { type : Number, required : true },
});
CurrencySchema.plugin(mongooseApiQuery)
CurrencySchema.plugin(createdModified, { index: true })
 
var CurrencyModel = mongoose.model('Currency', CurrencySchema);
var Currency = restifyMongoose(CurrencyModel);
server.post('/Currency', Currency.insert());
server.put('/Currency/:id', Currency.update());
server.del('/Currency/:id', Currency.remove());
server.get('/Currency', Currency.query());
server.get('/Currency/:id', Currency.detail());