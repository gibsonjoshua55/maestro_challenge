import React from 'react';
import Watch from './Watch';

export const routeComponents = [
    Watch
]

export default () => {
    return(
        <div className="fillParent">
            {routeComponents.map((Route, index) => <Route key={`Route_${index}`}/>)}
        </div>
    )
}