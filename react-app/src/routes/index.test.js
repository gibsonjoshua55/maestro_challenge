import React from 'react';
import Routes, {routeComponents} from './index';
import { shallow } from 'enzyme';

it('renders all routes', () => {
    const ShallowRoutes = shallow(<Routes />);
    /**check for each defined route */
    routeComponents.forEach((route) => {
        expect(ShallowRoutes.find(route).length).toBe(1);
    });
});
