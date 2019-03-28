const { ApolloError } = require('apollo-server');

class DocumentNotFoundError extends ApolloError{
    constructor(message, code, properties) {
        super(
            message ? message : 'The document could not be found' , 
            code ? code :'BAD_USER_INPUT', properties);

        this.name = 'DocumentNotFoundError';
    }
}

module.exports = DocumentNotFoundError;