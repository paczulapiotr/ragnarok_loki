import React from 'react';
import { shallow } from 'enzyme';
import App from '..';

describe('App', () => {
  it('should render', () => {
    const app = shallow(<App />);

    expect(app.exists()).toBe(true);
  });
});
