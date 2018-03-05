import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Button from './Button';

Enzyme.configure({ adapter: new Adapter() });


describe('Button', () => {
  let props;
  let buttonWrapper;

  beforeAll(() => {
    props = {
      onClick: jest.fn(),
      className: 'jest-class-name',
    };
    buttonWrapper = shallow(<Button {...props}>Give Me More</Button>);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button>Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<Button {...props}>Give Me More</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a button with provided className', () => {
    expect(buttonWrapper.find('.jest-class-name').length).toBe(1);
  });
});

