'use strict'
 
module.exports = {
    name: 'MongoRestApi',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3033,
    base_url: process.env.BASE_URL || 'http://localhost:3033',
    db: {
        uri: 'mongodb://127.0.0.1:27017/meandev',
    },
}