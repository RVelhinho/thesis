import React, { Component } from 'react';
import './dropdown.scss';
import _ from 'lodash';

export default class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		document.addEventListener('click', this.handleOutsideClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleOutsideClick);
	}

	handleOutsideClick = (event) => {
		if (
			this.props.reference.current &&
			!this.props.reference.current.contains(event.target)
		) {
			this.props.onCloseDropdown();
		}
	};

	render() {
		const { reference, values, onSortBy } = this.props;
		return (
			<div className='sort-dropdown' ref={reference}>
				{values.map((el, index) => {
					return (
						<div
							key={index}
							className='sort-dropdown__option-container'
							onClick={(e) => onSortBy(e, el)}
						>
							<div className='sort-dropdown__option-container__option'>
								<span>{el.value}</span>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
