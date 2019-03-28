import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogContentText from '@material-ui/core/DialogContentText';
import YesNoDialog from '../YesNoDialog';

import {getByKey, onChange, setUp, errorsExist, getFinalObj} from '../../utils/states';



const ItemContent = (props) => {
    const {edit, id, types, states, validationFunctions} = props;
    const primaryState = getByKey(states, types.primary.key);

    let primary, secondary;
    if(edit){
        primary = 
            <div>
                <TextField
                    id={`ListItemInput-${types.primary.key}`}
                    defaultValue={primaryState.value}
                    onChange={(event) => 
                        onChange(states, validationFunctions, types.primary.key, event.target.value)
                    }
                    error={primaryState.error}
                    label={types.primary.label}
                />
            </div>
        secondary = types.secondary.map((type) => {
            const secondaryState = getByKey(states, type.key)
            return(<div key={`ListItem-${id}-${type.key}`}>
                <TextField
                    id={`ListItemInput-${type.key}`}
                    defaultValue={secondaryState.value}
                    onChange={(event) => 
                        onChange(states, validationFunctions, type.key, event.target.value)
                    }
                    error={secondaryState.error}
                    label={type.label}
                />
            </div>)
        })
    }
    else {
        primary = <span id={`ListItem-${types.primary.key}`} >{primaryState.value}</span>;
        secondary = 
            (<span>
                {types.secondary.map((type, index) => {
                    const value = getByKey(states, type.key).value;
                    return(
                        <span id={`ListItem-${type.key}`} key={`ListItem-${id}-${type.key}`}>
                            {index !== 0 && <br/>}
                            {value !== undefined && value !== null && <strong>{`${type.label}: `}</strong>}
                            {value}
                        </span>
                    )
                })}
            </span>)
    }
    return <ListItemText disableTypography={edit}  primary={primary} secondary={secondary} />
}




export const EditableListItem = (props) => {
    const {types, obj, onUpdate, onDelete, id, onClick, disabled, ...rest} = props;
    const [edit, setEdit] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen]= useState(false);

    const states = [];
    const validationFunctions = [];
    setUp(states, validationFunctions, types, obj);


    const onEditToggle = () => {
        const errors = errorsExist(states);
        //if there aren't errors and edit will be toggled off, notify a new change
        if(edit && !errors){
            onUpdate(getFinalObj(states));
        }
        //if there are errors, do not allow the user to leave edit
        if(!errors){
            setEdit(!edit)
        }
        
    }

    const onDeleteDialogClose = (response) => {
        setDeleteDialogOpen(false);
        if(response){
            onDelete(id);
        }
    }


    return (
        <div>
            <ListItem disabled={disabled} id={`item-${id}`} button={!edit} onClick={edit ? () => {} : onClick} {...rest}>
                <ItemContent 
                    key={`${id}`}
                    edit={edit} 
                    id={id} 
                    types={types}
                    states={states}
                    validationFunctions={validationFunctions}
                />
                
                <ListItemSecondaryAction>
                    <IconButton component='button' id={`edit-button-${id}`} onClick={onEditToggle} >
                        <EditIcon />
                    </IconButton>
                    <IconButton component='button' id={`delete-button-${id}`} onClick={() => setDeleteDialogOpen(true)} >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <YesNoDialog title={"Delete Timestamp?"}open={deleteDialogOpen} onClose={onDeleteDialogClose}>
                <DialogContentText>Are you sure you want to delete this?</DialogContentText>
            </YesNoDialog>
        </div>
                
    )
}
const type = PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validationFunction: PropTypes.func.isRequired
})
EditableListItem.propTypes = {
    types: PropTypes.shape({
        primary: type,
        secondary: PropTypes.arrayOf(type)
    }),
    obj: PropTypes.object,
    onClick: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    id: PropTypes.string,
    disabled: PropTypes.bool
}

export default EditableListItem;
