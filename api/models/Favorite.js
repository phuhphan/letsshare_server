/**
 * Favorite.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 	autoCreatedAt: false,
    autoUpdatedAt: false,
    tableName : 'favorites',
    attributes: {
        favorite_id: {
            type			: 'string',
            columnName		: 'favorite_id',
            primaryKey      : true,
            unique          : true,
        },
        user: {
	      	model: 'User',
	    },
	    space: {
	      	model: 'Space',
	    },
        status: {
            type			: 'integer',
            columnName		: 'status',
        },
        created: {
            type			: 'date',
            columnName		: 'created',
        },
        edited: {
            type			: 'date',
            columnName		: 'edited',
        },

        getSpace: function (){
            Space.findOne({space_id: this.space}).exec(function (err, value){
                if (err) {
                    return null;
                }
                if (!value) {
                    return {name: value.name, }
                }else{
                    res.json(Response.success('Add successfully'));
                }
            });
        },
    }
};

