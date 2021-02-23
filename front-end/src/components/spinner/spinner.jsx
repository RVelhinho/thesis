import React from 'react';
import './spinner.scss';

/**
 * Component for animation a loading icon
 *
 * @component
 * @example
 * return (
 *  <Spinner />
 * )
 */

export const Spinner = () => {
	return (
		<div className='spinner-container'>
			<div className='spinner-container__container'>
				<div className='spinner-container__container__spinner'></div>
			</div>
		</div>
	);
};
