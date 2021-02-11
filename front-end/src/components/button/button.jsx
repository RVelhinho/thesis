import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = React.memo(({ text, color }) => {
	return (
		<div className={`custom-button custom-button--${color}`}>
			<span className={`custom-button__text custom-button__text--${color}`}>
				{text}
			</span>
		</div>
	);
});

Button.propTypes = {};

export default Button;
