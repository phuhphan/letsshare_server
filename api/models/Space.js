/**
 * Space.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	autoCreatedAt: false,
    autoUpdatedAt: false,
    tableName : 'spaces',
    attributes: {
        space_id: {
            type			: 'string',
            columnName		: 'space_id',
            primaryKey      : true,
            unique          : true,
        },
        user: {
	      	model: 'User',
	    },
        name: {
            type			: 'text',
            columnName		: 'name',
        },
        type: {
            type			: 'integer',
            columnName		: 'type',
        },
        description: {
            type			: 'text',
            columnName		: 'description',
        },
        kind: {
            type			: 'text',
            columnName		: 'kind',
        },
        suitable: {
            type			: 'text',
            columnName		: 'suitable',
        },
        floor_dimension: {
            type			: 'float',
            columnName		: 'floor_dimension',
        },
        ceiling_height: {
            type			: 'float',
            columnName		: 'ceiling_height',
        },
        floor_plan: {
            type			: 'text',
            columnName		: 'floor_plan',
        },
        max_people: {
            type			: 'integer',
            columnName		: 'max_people',
        },
        bedroom: {
            type			: 'integer',
            columnName		: 'bedroom',
        },
        bathroom: {
            type			: 'integer',
            columnName		: 'bathroom',
        },
        street: {
            type			: 'text',
            columnName		: 'street',
        },
        city: {
            type			: 'text',
            columnName		: 'city',
        },
        state: {
            type			: 'text',
            columnName		: 'state',
        },
        zipcode: {
            type			: 'text',
            columnName		: 'zipcode',
        },
        open_dates: {
            type			: 'text',
            columnName		: 'open_dates',
        },
        start_time: {
            type			: 'text',
            columnName		: 'start_time',
        },
        end_time: {
            type			: 'text',
            columnName		: 'end_time',
        },
        hour_price: {
            type			: 'float',
            columnName		: 'hour_price',
        },
        guidelines: {
            type			: 'text',
            columnName		: 'guidelines',
        },
        date_price: {
            type			: 'float',
            columnName		: 'date_price',
        },
        created: {
            type			: 'date',
            columnName		: 'created',
        },
        edited: {
            type			: 'date',
            columnName		: 'edited',
        },
        favorites: {
          collection: 'Favorite',
          via: 'space'
        },
    },
};