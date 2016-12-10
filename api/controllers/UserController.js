/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UserController = {

	//login via email
    login: function (req, res) {
    	var email 		= req.body.email;
		var password 	= req.body.password;    	

        User.query("SELECT users.email, users.password, users.user_id FROM users WHERE email = '" + email + "'", function(err, results) {
          if (err) 
            res.json(Response.fail(err));
          else{
            if (results.length > 0) {
                if (results[0].password === password) {
                    var session_id = GenerateId.sessionId().toString();
                    User.update({user_id: results[0].user_id.toString()},{session_id: session_id}).exec(function afterwards(err, updated){
                        if (err) {
                            res.json(Response.fail(err));
                        }else{
                            res.json(Response.success({user_id: results[0].user_id, session_id: session_id})); 
                            // console.log('Updated user to have name ' + updated[0].first_name);
                        }
                    });
                                       
                }else{
                    res.json(Response.fail("Password not match"));
                }
            }else{
                res.json(Response.fail("Your email does not exist"));
            }
          }
        });
    },

    //login via facebook
    fb_login: function (req, res) {
        // var taskIds = req.body.ids;
        // Tasks.destroy({"id": taskIds}, function (error, tasks) {
        //     if (error) console.error(error);
        // });
        res.json({success: true});
    },

    //login via google+
    g_login: function (req, res) {
        res.json({success: true});
    },

    //register
    register: function (req, res) {
    	var email 		= req.body.email;
		var password 	= req.body.password;    	
		var firstName	= req.body.first_name;
		var lastName	= req.body.last_name;

		User.query("SELECT users.email FROM users WHERE email = '" + email + "'", function(err, results) {
		  if (err) 
		  	res.json(Response.fail(err));
		  else{
            if (results.length > 0) {
                res.json(Response.fail("Your email is exist"));
            }else{
                var addUser = {first_name: firstName, last_name: lastName, email: email, password: password, user_id: GenerateId.userId().toString(), session_id: GenerateId.sessionId().toString(), created: new Date(), message_code:GenerateId.generalMessageCode(), email_code:GenerateId.generalEmailCode()};
            
                User.create(addUser).exec(function(err, result){
                    if (err) {
                        res.json(Response.fail(err));
                    }else{
                        res.json(Response.success({sessionId:addUser.session_id, email: email, user_id: addUser.user_id}));
                    }
                });
            }
		  }
		});
    },

    //fb_register
    fb_register: function (req, res) {
        res.json({success: true});
    },

    //google+ register
    g_register: function (req, res) {
        res.json({success: true});
    },

    //get detail information of user
    detail: function (req, res) {
        var user_id = req.param('user_id');
        var session_id = req.param('session_id');

        User.query("SELECT users.first_name, users.last_name, users.gender, users.email, users.phone_number, users.facebook, users.linkedin, users.twitter, users.about, users.language, users.work, users.avatar_id FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
                if (user_id.toString() === '0') {
                    res.json(Response.success(results[0]));
                }else{
                    User.query("SELECT users.first_name, users.last_name, users.gender, users.email, users.phone_number, users.facebook, users.linkedin, users.twitter, users.about, users.language, users.work, users.avatar_id FROM users WHERE user_id = '" + user_id + "'", function(err, results) {
                        if (err) 
                            res.json(Response.fail('This user have issues'));
                        else{
                            if (results.length > 0) {
                                res.json(Response.success(results[0]));
                            }else{
                                res.json(Response.fail('this user not found'));
                            }
                        }
                    });
                }
                
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
    },

    //check code user fill out from email
    check_email_verify_code: function (req, res) {
        var code = req.param('code');
        var session_id = req.param('session_id');

        // res.json(Response.success({code: code, session_id:session_id}));

        User.query("SELECT users.email_code FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
                if (results[0].email_code.toString() === code) {
                    res.json(Response.success(results[0]));
                }else{
                    res.json(Response.fail('Your code is incorrect'));
                }
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
    },

    //check code user fill out from message
    check_phone_verify_code: function (req, res) {
        var code = req.param('code');
        var session_id = req.param('session_id');

        // res.json(Response.success({code: code, session_id:session_id}));

        User.query("SELECT users.message_code FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
                if (results[0].message_code.toString() === code) {
                    res.json(Response.success(results[0]));
                }else{
                    res.json(Response.fail('Your code is incorrect'));
                }
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
    },

    //send an email contain new password
    forgot_password: function (req, res) {
        res.json({success: true});
    },

    //update user infor
    update: function (req, res) {
        var session_id = req.body.session_id;

        var data = req.body;
        delete data['session_id'];
        delete data['user_id'];
        delete data['email'];
        delete data['created'];


        User.query("SELECT users.user_id FROM users WHERE session_id = '" + session_id + "'", function(err, results) {
          if (err) 
            res.json(Response.fail('This session have issues'));
          else{
            if (results.length > 0) {
                User.update({user_id: results[0].user_id.toString()},data).exec(function afterwards(err, updated){
                    if (err) {
                        res.json(Response.fail(err));
                    }else{
                        res.json(Response.success(data)); 
                            // console.log('Updated user to have name ' + updated[0].first_name);
                    }
                });
            }else{
                res.json(Response.fail('This session is expired'));
            }
          }
        });
    }
};
module.exports = UserController;