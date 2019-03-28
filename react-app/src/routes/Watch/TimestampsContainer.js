import React from 'react';
import PropTypes from 'prop-types';
import Timestamps from '../../components/Timestamps';

import { UpdateTimestampMutation, AddTimestampMutation, DeleteTimestampMutation } from '../../mutations/timestampMutations';
import { FindTimestampCollectionQuery } from '../../queries/timestampCollectionQueries';

const TimestampsContainer = (props) => {
    const {timestampCollectionId, player, playTimestamp, disabled} = props;
    if(timestampCollectionId && player){
        return(
            <React.Fragment>
                <FindTimestampCollectionQuery
                    collectionId={timestampCollectionId}
                >
                    {({ loading, data, error }) => {
                        
                        if(data && !error && !loading){
                            return(
                                <AddTimestampMutation 
                                    collectionId={timestampCollectionId}>
                                {(addTimestamp ) =>{
                                    return(
                                    <UpdateTimestampMutation>
                                    {(updateTimestamp) => {
                                        return(
                                        <DeleteTimestampMutation collectionId={timestampCollectionId}>
                                        {(deleteTimestamp) => {
                                            var {timestamps} = data.timestampCollection;
                                            timestamps.sort((a,b) => {
                                                return (a.time - b.time);
                                            })
                                            return( 
                                                <Timestamps 
                                                    timestamps={timestamps} 
                                                    player={player}
                                                    collectionId={timestampCollectionId}
                                                    onUpdate={(variables) => {
                                                        updateTimestamp(variables);
                                                    }}
                                                    onDelete={(variables) => 
                                                        deleteTimestamp(variables)}
                                                    onAdd={(variables) => {
                                                        addTimestamp(variables);
                                                    }}
                                                    playTimestamp={playTimestamp}
                                                    disabled={disabled}
                                                />
                                            )
                                            
                                        }}
                                        </DeleteTimestampMutation>
                                        )
                                        }}
                                    </UpdateTimestampMutation>);
                                }}
                                </AddTimestampMutation>
                            )
                        }
                        else{
                            return <Timestamps />
                        }
                    }}
                </FindTimestampCollectionQuery>
            </React.Fragment>
        )
    }
    else{
        return <Timestamps />;
    }
}

TimestampsContainer.propTypes ={
    timestampCollectionId: PropTypes.string,
    player: PropTypes.object,
    disabled: PropTypes.bool,
}

export default TimestampsContainer;