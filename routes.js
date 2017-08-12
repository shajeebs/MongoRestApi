'use strict'
 
/**
* Module Dependencies
*/
const _      = require('lodash'),
      errors = require('restify-errors');
 
/**
* Model Schema
*/
// const TodoModel = require('./models/todo'),
//     CustomerModel = require('./models/Customer'),
//     InvoiceModel = require('./models/Invoice'),
// module.exports = TodoModel
// module.exports = CustomerModel
// module.exports = InvoiceModel
 
//Test
require('./models/Test/test_customer')
require('./models/Test/test_invoice')
//require('./models/Test/test_todo')
 
require('./models/Administration/Company')
require('./models/Administration/AuditLog')
require('./models/Administration/GeneralLedgerSetting')
 
require('./models/Common/Status')
require('./models/Common/Party')
require('./models/Common/Contact')
require('./models/Common/PaymentTerm')
//TODO Common/Address
 
require('./models/Inventory/Item')
require('./models/Inventory/ItemCategory')
require('./models/Inventory/Measurement')
require('./models/Inventory/InventoryControlJournal')
 
require('./models/Purchasing/Vendor')
require('./models/Purchasing/PurchaseInvoice')
require('./models/Purchasing/PurchaseInvoiceLine')
require('./models/Purchasing/PurchaseOrder')
require('./models/Purchasing/PurchaseOrderLine')
require('./models/Purchasing/PurchaseReceipt')
require('./models/Purchasing/PurchaseReceiptLine')
 
require('./models/Sales/Customer')
require('./models/Sales/SalesDelivery')
require('./models/Sales/SalesDeliveryLine')
require('./models/Sales/SalesInvoice')
require('./models/Sales/SalesInvoiceLine')
require('./models/Sales/SalesOrder')
require('./models/Sales/SalesOrderLine')
require('./models/Sales/SalesQuote')
require('./models/Sales/SalesQuoteLine')
require('./models/Sales/SalesReceipt')
require('./models/Sales/SalesReceiptLine')
 
require('./models/TaxSystem/Tax')
require('./models/TaxSystem/TaxGroup')
require('./models/TaxSystem/TaxGroupTax')
require('./models/TaxSystem/TaxGroupTax')
 
require('./models/Financial/Account')
require('./models/Financial/AccountClass')
require('./models/Financial/Currency')
require('./models/Financial/Bank')
require('./models/Financial/FinancialYear')
require('./models/Financial/GeneralLedger')
require('./models/Financial/GeneralLedgerLine')
require('./models/Financial/JournalEntry')
require('./models/Financial/JournalEntryLine')
require('./models/Financial/MainContraAccount')
