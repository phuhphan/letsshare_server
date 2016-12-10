/**
 * AmenityController
 *
 * @description :: Server-side logic for managing Amenities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	success: function(data){
		return {success: true, data: data, message: ''};
	},

	fail:function(message){
		return {success: false, data: null, message: message};
	},

};

