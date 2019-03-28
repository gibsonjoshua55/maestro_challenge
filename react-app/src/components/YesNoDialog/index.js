import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const YesNoDialog = (props) => {
    const {open, children, title, onClose} = props
    return (
        <div>
        <Dialog
            open={open}
            onClose={()=>onClose(false)}
        >
            <DialogTitle><span id='yes-no-title'>{title}</span></DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
            <Button id={'no-button'} onClick={() => onClose(false)} color="primary">
                No
            </Button>
            <Button id={'yes-button'} onClick={() => onClose(true)} color="primary" autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

YesNoDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func
}

export default YesNoDialog;