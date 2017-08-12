'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PurchaseInvoiceSchema = new mongoose.Schema({
    VendorId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    GeneralLedgerId  : { type: mongoose.Schema.Types.ObjectId, ref: 'GeneralLedger' },
    Date : { type : Date, required : true },
    No : { type : String, required : true },
    VendorInvoiceNo : { type : String,  },
    Description : { type : String,  },
    PurchaseOrderId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
    PaymentTermId  : { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentTerm' },
    ReferenceNo : { type : String },
    Status  : { type: Number },//Draft = 0, Open = 1, Paid = 2
    //TODO:Vendor
    //TODO:GeneralLedger
    //TODO:PurchaseInvoiceLines
    //TODO:PurchaseOrders
    //TODO:VendorPayments
});
PurchaseInvoiceSchema.plugin(mongooseApiQuery)
PurchaseInvoiceSchema.plugin(createdModified, { index: true })
 
var PurchaseInvoiceModel = mongoose.model('PurchaseInvoice', PurchaseInvoiceSchema);
var PurchaseInvoice = restifyMongoose(PurchaseInvoiceModel);
server.post('PurchaseInvoice', PurchaseInvoice.insert());
server.put('/PurchaseInvoice/:id', PurchaseInvoice.update());
server.del('/PurchaseInvoice/:id', PurchaseInvoice.remove());
server.get('/PurchaseInvoice', PurchaseInvoice.query());
//server.get('/PurchaseInvoice/:id', PurchaseInvoice.detail());
server.get('/PurchaseInvoice/:id', function(req, res, next){
    var matchQuery = {'_id': mongoose.Types.ObjectId(req.params.id)};
    var lookupQuery = { from: "PurchaseInvoiceLines", localField: "_id", foreignField: "PurchaseInvoiceId", as: "Amount" };
    PurchaseInvoice.aggregate().match(matchQuery).lookup(lookupQuery)
        .exec(function(err, doc) {
            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }
            res.json(doc)
            next()
        });
    //res.send('hello ' + req.params.ppp);
});