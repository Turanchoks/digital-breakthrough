import React from 'react';
import PropTypes from 'prop-types';


import s from './Button.scss';

const ButtonComponent = ({ type, children, text }) => (
  <button type={type} className={s.button}>
    {text || children}
  </button>
);

ButtonComponent.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  // eslint-disable-next-line
  style: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  pendingText: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'gray', 'red']),
  background: PropTypes.bool,
  beforeIcon: PropTypes.string
};

ButtonComponent.defaultProps = {
  href: '',
  onClick: _ => _,
  disabled: false,
  pending: false,
  style: {},
  className: '',
  type: 'button',
  text: '',
  pendingText: '',
  color: 'blue',
  background: true,
  beforeIcon: ''
};

export default ButtonComponent;
