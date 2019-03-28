import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    message: {
        display: 'flex',
        alignItems: 'center',
    },
})

export class ErrorMessage extends React.Component {
    constructor() {
        super();
        this.state = {open: true};
    }
    render() {
        const {classes, message, ...rest} = this.props;
        const {open} = this.state;
        return(
            <Snackbar
                className={classes.error}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                    <ErrorIcon />
                    {message}
                    </span>
                }
                open={open}
                {...rest}
            />
        )
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({open: false})
        }, 4000);
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string
}

export default withStyles(styles)(ErrorMessage);