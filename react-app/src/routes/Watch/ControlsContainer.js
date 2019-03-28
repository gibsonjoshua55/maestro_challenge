import React from 'react';
import PropTypes from 'prop-types';
import { FindTimestampCollectionQuery } from '../../queries/timestampCollectionQueries';
import Controls from '../../components/Controls';

const ControlsContainer = (props) => {
    const {timestampCollectionId, controls, setControls, playTimestamp} = props;
    if(timestampCollectionId){
        return(
            <React.Fragment>
                <FindTimestampCollectionQuery
                    collectionId={timestampCollectionId}
                >
                    {({ loading, data, error }) => {
                        
                        if(data && !error && !loading){
                            const {timestamps} = data.timestampCollection;
                            timestamps.sort((a,b) => {
                                return (a.time - b.time);
                            })
                            return(
                                
                                <Controls 
                                    timestamps={timestamps} 
                                    controls={controls}
                                    setControls={setControls}
                                    playTimestamp={playTimestamp}
                                />
                            )
                                            
                                        
                                        
                        }
                        else{
                            return <Controls controls={controls} setControls={setControls} />
                        }
                    }}
                </FindTimestampCollectionQuery>
            </React.Fragment>
        )
    }
    else{
        return <Controls controls={controls} setControls={setControls} />;
    }
}

ControlsContainer.propTypes ={
    timestampCollectionId: PropTypes.string,
    controls: PropTypes.object,
    setControls: PropTypes.func,
    playTimestamp: PropTypes.func
}

export default ControlsContainer;