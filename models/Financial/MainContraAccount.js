'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var MainContraAccountSchema = new mongoose.Schema({
    MainAccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    RelatedContraAccountId : { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    //TODO: MainAccount
    //TODO: RelatedContraAccount
});
MainContraAccountSchema.plugin(mongooseApiQuery)
MainContraAccountSchema.plugin(createdModified, { index: true })
 
var MainContraAccountModel = mongoose.model('MainContraAccount', MainContraAccountSchema);
var MainContraAccount = restifyMongoose(MainContraAccountModel);
server.post('/MainContraAccount', MainContraAccount.insert());
server.put('/MainContraAccount/:id', MainContraAccount.update());
server.del('/MainContraAccount/:id', MainContraAccount.remove());
server.get('/MainContraAccount', MainContraAccount.query());
server.get('/MainContraAccount/:id', MainContraAccount.detail());