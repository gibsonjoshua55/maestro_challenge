const { ApolloError } = require('apollo-server');

class DuplicateAddError extends ApolloError{
    constructor(message, code, properties) {
        super(
            message ? message : 'The document to be added already exists' , 
            code ? code :'BAD_USER_INPUT', properties);

        this.name = 'DuplicateAddError';
    }
}

module.exports = DuplicateAddError;