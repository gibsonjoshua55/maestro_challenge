import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Section from '../Section'
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles';
import AddDialog from '../AddDialog';
import EditableListItem from '../EditableListItem';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    iconButton: {
        backgroundColor: theme.palette.grey[200]
    }
})

export const EditableList = (props) => {
    const {idKey, objs, types, onUpdate, onDelete, onAdd, classes, onClick, title, enabled, selectedId, disabled} = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    

    return(
        <Section 
            headerTitle={title}
            headerAction={
                <IconButton id='add-button' className={classes.iconButton} onClick={() => setDialogOpen(true) } disabled={!enabled}>
                    <AddIcon />
                </IconButton>
            }
        >
            <AddDialog types={types} open={dialogOpen} onClose={(res) => {
                    if(res !== undefined)
                        onAdd(res);
                    setDialogOpen(false);
            }} />
            {
                objs &&
                <List component="nav">
                    <Divider />
                    {objs.map((obj) => {
                        return(
                            <div key={obj.id}>
                                <EditableListItem
                                    id={obj[idKey]}
                                    types={types}
                                    obj={obj}
                                    onUpdate={(res) => { 
                                        onUpdate(obj[idKey], res)}
                                    }
                                    onDelete={() => {onDelete(obj[idKey])}}
                                    onClick={() => onClick(obj[idKey], obj)}
                                    selected={obj[idKey] === selectedId}
                                    disabled={disabled}
                                />
                                <Divider/>
                            </div>
                        )
                    })}
                </List>
            }
        </Section>
    )
}

EditableList.propTypes = {
    id: PropTypes.string,
    types: PropTypes.object,
    objs: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    onAdd: PropTypes.func,
    onClick: PropTypes.func,
    title: PropTypes.string,
    idKey: PropTypes.string,
    selectedId: PropTypes.string,
    disabled: PropTypes.bool,
}
export default withStyles(styles)(EditableList);