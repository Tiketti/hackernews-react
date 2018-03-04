import React from 'react';
import PropTypes from 'prop-types';

const Welcome = props => (
  <h1 className="outOfTheWay">Hello, {props.name}</h1>
);

Welcome.propTypes = {
  name: PropTypes.string,
};

Welcome.defaultProps = {
  name: 'Stranger',
};

export default Welcome;
