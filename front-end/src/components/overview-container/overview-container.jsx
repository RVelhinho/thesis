import React from 'react';
import PropTypes from 'prop-types';
import './overview-container.scss';

function OverviewContainer({
	location,
	date,
	aircraft,
	operator,
	description,
}) {
	return (
		<div className='col-2 px-0 overview-container'>
			<div className='row mx-0'>
				<div className='col px-0'>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__title'></span>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__text'></span>
						</div>
					</div>
				</div>
				<div className='col px-0'>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__title'></span>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__text'></span>
						</div>
					</div>
				</div>
			</div>
			<div className='row mx-0'>
				<div className='col px-0'>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__sub-title'></span>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__text'></span>
						</div>
					</div>
				</div>
			</div>
			<div className='row mx-0'>
				<div className='col px-0'>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__sub-title'></span>
						</div>
					</div>
					<div className='row mx-0'>
						<div className='col px-0'>
							<span className='overview-container__text'></span>
						</div>
					</div>
				</div>
			</div>
			<div className='row mx-0'>
				<div className='col px-0'>
					<div className='col px-0'>
						<div className='row mx-0'>
							<div className='col px-0'>
								<span className='overview-container__sub-title'></span>
							</div>
						</div>
						<div className='row mx-0'>
							<div className='col px-0 overview-container__description-container'>
								<span className='overview-container__description-container__text'></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

OverviewContainer.propTypes = {};

export default OverviewContainer;
