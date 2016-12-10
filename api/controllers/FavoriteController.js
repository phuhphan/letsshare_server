/**
 * FavoriteController
 *
 * @description :: Server-side logic for managing Favorites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function (req, res){
		var page		= req.param('page');
		var session_id	= req.param('session_id');
		var limited 	= req.param('limited');

		User.query("SELECT users.user_id, users.first_name, users.last_name, users.gender FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
            	var userId = results[0].user_id;

            	var query = "SELECT favorites.space FROM favorites WHERE user = '" + userId + "' LIMIT " + (page - 1)*limited +","+ limited;
            	if (limited.toString() === '0') {
            		query = "SELECT favorites.space FROM favorites WHERE user = '" + userId + "'";
            	}

            	Favorite.query(query, function(err, favorites) {
		          if (err) 
		            res.json(Response.fail('This space have issues'));
		          else{
		            if (favorites.length > 0) {

		            	res.json(Response.success(favorites));
		            }else{
		                res.json(Response.fail('We have not favorite for this user'));
		            }
		          }
		        });
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });

	},
	modify: function (req, res){
		var space_id	= req.param('space_id');
		var session_id	= req.param('session_id');
		var type 		= req.param('type');

		User.query("SELECT users.user_id, users.first_name, users.last_name, users.gender FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
            	var userId = results[0].user_id;

            	if (type.toString() === 'add') {
            		var favoriteId = GenerateId.favoriteId();

            		var favorite = {favorite_id: favoriteId, space: space_id, user: userId, status: 1, created: new Date(), edited: new Date()};

            		Favorite.findOne({user:userId, space: space_id}).exec(function (err, value){
					  	if (err) {
					    	res.json(Response.fail('Have issue when add this space'));
					  	}
					  	if (!value) {
					    	Favorite.create(favorite).exec(function(err, result){
			                    if (err) {
			                        res.json(Response.fail('Have issue when add this space'));
			                    }else{
			                        res.json(Response.success('Add successfully'));
			                    }
			                });
					  	}else{
					  		res.json(Response.success('Add successfully'));
					  	}
					});
            	}else if (type.toString() === 'remove') {
            		Favorite.destroy({user:userId, space: space_id}).exec(function (err){
					  	if (err) {
					    	res.json(Response.fail('Have issue when remove this space'));
					 	}else{
					  		res.json(Response.success('Remove successfully'));
					  	}
					});
            	}else{
            		res.json(Response.fail('This request is not found'));
            	}
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
	},
};

