/**
 * AmenityController
 *
 * @description :: Server-side logic for managing Amenities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var uuid 	= require('node-uuid');
var crypto 	= require('crypto');
var biguint = require('biguint-format');
var format  = require('date-format');
require('x-date'); 

module.exports = {
	
	userId: function(){
		return uuid.v4();
	},

	sessionId:function(){
		return crypto.randomBytes(Math.ceil(100 * 3 / 4))
        .toString('base64')   // convert to base64 format
        .slice(0, 100)        // return required number of characters
        .replace(/\+/g, '0')  // replace '+' with '0'
        .replace(/\//g, '0'); // replace '/' with '0'
	},

	favoriteId: function(){
		return crypto.randomBytes(Math.ceil(10))
        .toString('hex')
        .slice(0,10) + "-" + format.asString('yyyyMMddhhmmss', new Date());
	},

	spaceId: function(){
		return crypto.randomBytes(Math.ceil(5))
        .toString('hex')
        .slice(0,5) + "-" + format.asString('yyyyMMddhhmmss', new Date());
	},

	generalEmailCode: function(){
		return crypto.randomBytes(Math.ceil(3))
        .toString('hex')
        .slice(0,6);
	},

	generalMessageCode: function(){
		return crypto.randomBytes(Math.ceil(3))
        .toString('hex')
        .slice(0,6);
	}	

};

