'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var PermissionSchema = new mongoose.Schema({
    Name : { type : String, required : true },
    DisplayName : { type : String },
    GroupId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    //TODO Group
    //TODO RolePermissions
});
PermissionSchema.plugin(mongooseApiQuery)
PermissionSchema.plugin(createdModified, { index: true })
 
var PermissionModel = mongoose.model('Permission', PermissionSchema);
var Permission = restifyMongoose(PermissionModel);
server.post('Permission', Permission.insert());
server.put('/Permission/:id', Permission.update());
server.del('/Permission/:id', Permission.remove());
server.get('/Permission', Permission.query());
server.get('/Permission/:id', Permission.detail());