import React from 'react';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom"; 
import { shallow } from 'enzyme';

it('renders a router', () => {
  const AppShallow = shallow(<App />);
  expect(AppShallow.find(Router).length).toBe(1);
});
