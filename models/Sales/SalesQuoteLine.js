'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var SalesQuoteLineSchema = new mongoose.Schema({
    SalesQuoteId  : { type: mongoose.Schema.Types.ObjectId, ref: 'SalesQuote' },
    ItemId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    MeasurementId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
    Quantity : { type : Number,  },
    Discount : { type : Number,  },
    Amount : { type : Number,  },
    //TODO SalesQuote
    //TODO Item
    //TODO Measurement
});
SalesQuoteLineSchema.plugin(mongooseApiQuery)
SalesQuoteLineSchema.plugin(createdModified, { index: true })
 
var SalesQuoteLineModel = mongoose.model('SalesQuoteLine', SalesQuoteLineSchema);
var SalesQuoteLine = restifyMongoose(SalesQuoteLineModel);
server.post('SalesQuoteLine', SalesQuoteLine.insert());
server.put('/SalesQuoteLine/:id', SalesQuoteLine.update());
server.del('/SalesQuoteLine/:id', SalesQuoteLine.remove());
server.get('/SalesQuoteLine', SalesQuoteLine.query());
server.get('/SalesQuoteLine/:id', SalesQuoteLine.detail());