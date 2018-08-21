import React from 'react';

const ActionButton = (props) => (
  <a className="btn btn-app" {...props} style={styleButton}>
  	{props.children}
  </a>
);

const styleButton = {
	zIndex: 999,
	float: 'right',
	top: 55,
	position: 'fixed',
	right: 17
}

export default ActionButton;