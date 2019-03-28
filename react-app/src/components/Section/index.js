import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {
        height: '100%',
        padding: 10,
        boxSizing: 'border-box',
        '-moz-box-sizing': 'border-box', /* Firefox */
        '-webkit-box-sizing': 'border-box', /* Safari */
        overflow: 'auto'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

const Header = (props) => {
    const {classes, headerTitle, headerAction} = props;
    return(
        <div className={classes.header}>
            {headerTitle &&
                <Typography id={`header-title`} variant="h3">{headerTitle}</Typography>
            }
            {headerAction &&
                headerAction
            }
        </div>
    )
}

export const Section = (props) => {
    const {children, classes} = props;
    return(
        <Paper className={classes.root}>
            <Header {...props} />
            {
                children
            }
        </Paper>
    )
}

Section.propTypes = {
    headerTitle: PropTypes.string,
    headerAction: PropTypes.node
}

export default withStyles(styles)(Section);