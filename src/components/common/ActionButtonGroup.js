import React from 'react';

const ActionButton = (props) => (
  <div {...props} style={styleButton}>
  	{props.children}
  </div>
);

const styleButton = {
	zIndex: 999,
	float: 'right',
	top: 55,
	position: 'fixed',
	right: 17
}

export default ActionButton;