import React from 'react';
import './button.scss';

const Button = React.memo(
	({
		text,
		color,
		onClick,
		onMouseEnter,
		disabled,
		roundedCornersDisabled,
	}) => {
		return (
			<div
				className={
					disabled
						? `custom-button custom-button--${color} disabled`
						: `custom-button custom-button--${color}`
				}
				style={roundedCornersDisabled ? { borderRadius: 0 } : {}}
				onMouseEnter={onMouseEnter ? () => onMouseEnter() : null}
				onClick={onClick ? () => onClick() : null}
			>
				<span className={`custom-button__text custom-button__text--${color}`}>
					{text}
				</span>
			</div>
		);
	}
);

Button.propTypes = {};

export default Button;
