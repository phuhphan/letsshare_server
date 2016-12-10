/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	autoCreatedAt: false,
    autoUpdatedAt: false,
    tableName : 'users',
    attributes: {
        user_id: {
            type			: 'string',
            columnName		: 'user_id',
            primaryKey      : true,
            unique          : true,
        },
        first_name: {
            type			: 'text',
            columnName		: 'first_name',
        },
        last_name: {
            type			: 'text',
            columnName		: 'last_name',
        },
        email: {
            type			: 'text',
            columnName		: 'email',
        },
        password: {
            type			: 'text',
            columnName		: 'password',
        },
        session_id: {
            type			: 'text',
            columnName		: 'session_id',
            unique: true,
        },
        gender: {
            type            : 'boolean',
            columnName      : 'gender',
        },  
        phone_number: {
            type            : 'text',
            columnName      : 'phone_number',
        },   
        facebook: {
            type            : 'text',
            columnName      : 'facebook',
        }, 
        linkedin: {
            type            : 'text',
            columnName      : 'linkedin',
        },
        twitter: {
            type            : 'text',
            columnName      : 'twitter',
        },
        about: {
            type            : 'text',
            columnName      : 'about',
        },
        email_code: {
            type            : 'text',
            columnName      : 'email_code',
        },
        message_code: {
            type            : 'text',
            columnName      : 'message_code',
        },
        language: {
            type            : 'text',
            columnName      : 'language',
        },
        work: {
            type            : 'text',
            columnName      : 'work',
        },
        avatar_id: {
            type            : 'text',
            columnName      : 'avatar_id',
        },
        created: {
            type            : 'date',
            columnName      : 'created',
        },
        edited: {
            type            : 'date',
            columnName      : 'edited',
        },
        password_temp: {
            type            : 'text',
            columnName      : 'password_temp',
        },
        spaces: {
          collection: 'Space',
          via: 'user'
        },
        favorites: {
          collection: 'Favorite',
          via: 'user'
        },
    }
};

