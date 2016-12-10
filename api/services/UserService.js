/**
 * AmenityController
 *
 * @description :: Server-side logic for managing Amenities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	isSessionExpired:function(session_id){
		User.query("SELECT users.first_name, users.last_name, users.gender, users.email, users.phone_number, users.facebook, users.linkedin, users.twitter, users.about, users.language, users.work, users.avatar_id FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
		  if (err) 
		  	return null;
		  else{
            if (results.length > 0) {
                return results[0];
            }else{
                return null;
            }
		  }
		});
	},

};

