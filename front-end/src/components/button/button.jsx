import React from 'react';
import './button.scss';

const Button = React.memo(({ text, color, onClick, onMouseEnter }) => {
	return (
		<div
			className={`custom-button custom-button--${color}`}
			onMouseEnter={onMouseEnter ? () => onMouseEnter() : null}
			onClick={onClick ? () => onClick() : null}
		>
			<span className={`custom-button__text custom-button__text--${color}`}>
				{text}
			</span>
		</div>
	);
});

Button.propTypes = {};

export default Button;
