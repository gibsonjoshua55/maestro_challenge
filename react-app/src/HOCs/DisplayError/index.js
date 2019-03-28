import React from 'react';
import ErrorMessage from '../../components/ErrorMessage';

/**
 * This component can be used to to display error messages when a query
 * or mutation returns an error.  To do so, simply wrap a component 
 * using the function dipslayError(Component) and use that instead of the
 * Query or Mutation component.
 * 
 * Additionally, a function errorToMessage can be passed as a prop to the wrapped component.
 * This function will be ran on the returned error to convert the error into a message.  If
 * the function is not provided, the message displayed will be error.message.
 * 
 * Note: instead of passing a render function as a child of the Mutation
 * or Query, the function should be passed as a prop named render.
 */


const DisplayError = (Component) => {
    return(props) => {
        const {children, errorToMessage, ...rest} = props;
        let getMessage;
        if(errorToMessage)
            getMessage = errorToMessage;
        else{
            getMessage = (error) => {
                return error.message;
            }
        }
        return(
            <Component {...rest}>
                {
                    (arg1, arg2) => {
                        let props;
                        //is type Mutation function(mutationFunc, props)
                        if(typeof arg1  === 'function'){
                            props = arg2
                        }
                        //is type Query function(props)
                        else{
                            props = arg1;
                        }
                        const {error} = props;
                        return(
                            <React.Fragment>
                                {children(arg1, arg2)}
                                {error && <ErrorMessage message={getMessage(error)} />}
                            </React.Fragment>
                        );
                    }
                }
            </Component>
        )
    }
}
 export default DisplayError;