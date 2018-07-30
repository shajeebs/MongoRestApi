'use strict'
 
const mongoose = require('mongoose'),
    restifyMongoose = require('restify-mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified = require('mongoose-createdmodified').createdModifiedPlugin
 
var RolePermissionSchema = new mongoose.Schema({
    RoleId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    PermissionId  : { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
    //TODO Role
    //TODO Permission
});
RolePermissionSchema.plugin(mongooseApiQuery)
RolePermissionSchema.plugin(createdModified, { index: true })
 
var RolePermissionModel = mongoose.model('RolePermission', RolePermissionSchema);
var RolePermission = restifyMongoose(RolePermissionModel);
server.post('/RolePermission', RolePermission.insert());
server.put('/RolePermission/:id', RolePermission.update());
server.del('/RolePermission/:id', RolePermission.remove());
server.get('/RolePermission', RolePermission.query());
server.get('/RolePermission/:id', RolePermission.detail());