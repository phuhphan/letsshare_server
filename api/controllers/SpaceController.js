/**
 * SpaceController
 *
 * @description :: Server-side logic for managing Spaces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//Add a space
	add: function (req, res){
		var session_id = req.body.session_id;

		var body = req.body;
		delete body['session_id'];
		delete body['space_id'];
        delete body['user_id'];
        delete body['created'];
        delete body['edited'];

		User.query("SELECT users.user_id, users.first_name, users.last_name, users.gender FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
            	body.space_id 		= GenerateId.spaceId();
            	body.user			= results[0];
            	body.created 		= new Date();
            	body.edited			= new Date();

            	Space.create(body).exec(function(err, result){
                    if (err) {
                        res.json(err);
                    }else{
                        res.json(Response.success(body));
                    }
                });
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
	},
	list: function (req, res){
		var limited 	= req.param('limited');
		var user_id 	= req.param('user_id');
		var page		= req.param('page');
		var session_id	= req.param('session_id');

		User.query("SELECT users.user_id, users.first_name, users.last_name, users.gender FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
            	var userId = results[0].user_id;
            	if (user_id.toString() !== '0') {
            		userId = user_id;
            	}

            	var userBody = {user_id:results[0].user_id, first_name:results[0].first_name, last_name:results[0].last_name};

            	var query = "SELECT * FROM spaces WHERE user = '" + userId + "' LIMIT " + (page - 1)*limited +","+ limited;
            	if (limited.toString() === '0') {
            		query = "SELECT * FROM spaces WHERE user = '" + userId + "'";
            	}

            	Space.query(query, function(err, results) {
		          if (err) 
		            res.json(Response.fail('This space have issues'));
		          else{
		            if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var space = results[i];
                            results[i].user = space.user;
                        }
		            	res.json(Response.success({space: results}));
		            }else{
		                res.json(Response.fail('We have not space for this user'));
		            }
		          }
		        });
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
	},
	search: function (req, res){
		
	},
	detail: function (req, res){
		var space_id	= req.param('space_id');
		var session_id	= req.param('session_id');

        User.query("SELECT users.user_id, users.first_name, users.last_name, users.gender FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
                Favorite.findOne({space_id:space_id}).exec(function (err, value){
                    if (err) {
                        res.json(Response.fail('Have issue on this space'));
                    }
                    if (!value) {
                        res.json(Response.success(value));
                    }else{
                        res.json(Response.success('This space is not found'));
                    }
                });
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });

	}
};

