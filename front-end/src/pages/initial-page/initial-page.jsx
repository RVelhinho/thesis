import React from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import './initial-page.scss';

const InitialPage = ({}) => {
	return (
		<div className='initial-page-container'>
			<div className='row w-100 h-50 mx-0 d-flex flex-column justify-content-center align-items-center'>
				<div className='col px-0 d-flex flex-column justify-content-center align-items-center'>
					<h1 className='initial-page-container__sub-title'>Welcome to</h1>
					<h1 className='initial-page-container__title'>CrashVis</h1>
				</div>
			</div>
			<div className='row mx-0 w-100 h-50'>
				<div className='col px-0 pr-4 d-flex justify-content-end align-items-top'>
					<NavLink
						to='/visualization'
						className='initial-page-container__button'
					>
						<h1 className='initial-page-container__button__content'>
							Visualization
						</h1>
					</NavLink>
				</div>
				<div className='col px-0 pl-4 d-flex justify-content-start align-items-top'>
					<NavLink to='/results' className='initial-page-container__button'>
						<div className='initial-page-container__button__content'>
							Results
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default InitialPage;
