'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var GeneralLedgerSettingSchema = new mongoose.Schema({
    CompanyId : { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    PayableAccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PurchaseDiscountAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    GoodsReceiptNoteClearingAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    SalesDiscountAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    ShippingChargeAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    PermanentAccountId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    IncomeSummaryAccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
});
GeneralLedgerSettingSchema.plugin(mongooseApiQuery)
GeneralLedgerSettingSchema.plugin(createdModified, { index: true })
 
var GeneralLedgerSettingModel = mongoose.model('GeneralLedgerSetting', GeneralLedgerSettingSchema);
var GeneralLedgerSetting = restifyMongoose(GeneralLedgerSettingModel);
server.post('/GeneralLedgerSetting', GeneralLedgerSetting.insert());
server.put('/GeneralLedgerSetting/:id', GeneralLedgerSetting.update());
server.del('/GeneralLedgerSetting/:id', GeneralLedgerSetting.remove());
server.get('/GeneralLedgerSetting', GeneralLedgerSetting.query());
server.get('/GeneralLedgerSetting/:id', GeneralLedgerSetting.detail());