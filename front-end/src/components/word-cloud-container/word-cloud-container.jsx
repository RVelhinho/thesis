import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select, pointer } from 'd3-selection';
import { transition } from 'd3-transition';
import { scaleLinear } from 'd3-scale';
import $ from 'jquery';
import cloud from 'd3-cloud';
import './word-cloud-container.scss';
import CustomToolTip from '../custom-tooltip/custom-tooltip';

export default class WordCloudContainer extends PureComponent {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}
	static propTypes = {};

	drawCloud() {
		const { id, data, threshold = 20 } = this.props;
		const myRef = this.myRef;
		const w = $(`#${id}`).width();
		const h = $(`#${id}`).height();

		const wordScale = scaleLinear().domain([0, 75]).range([10, 30]);

		const randomRotate = scaleLinear().domain([0, 1]).range([0, 90]);

		cloud()
			.size([w, h])
			.words(data)
			.rotate(() => randomRotate(Math.round(Math.random())))
			.fontSize((d) => wordScale(d.value))
			.padding(5)
			.on('end', draw)
			.start();

		function draw(words) {
			const svg = select(myRef.current)
				.append('div')
				.classed('svg-container', true)
				.append('svg')
				.attr('preserveAspectRatio', 'xMidYMid meet')
				.attr('viewBox', `0 0 ${w} ${h}`)
				// Class to make it responsive.
				// Container class to make it responsive.
				.classed('svg-content', true)
				.append('g')
				.attr('id', 'wordCloud')
				.attr('transform', `translate(${w / 2},${h / 2})`);

			svg
				.selectAll('text')
				.data(words)
				.enter()
				.append('text')
				.style('font-size', (d) => d.size + 'px')
				.style('fill', (d) => {
					if (d.value >= 75) {
						return '#ed8c15';
					} else if (d.value >= 50) {
						return '#f09e3a';
					} else if (d.value >= 25) {
						return '#edaa58';
					} else {
						return '#e8b77b';
					}
				})
				.style('cursor', 'pointer')
				.attr('text-anchor', 'middle')
				.attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
				.text((d) => d.text)
				.on('mouseover', function (d) {
					select(this).style('fill', '#c97712');
					select(`#${id} .custom-tooltip`)
						.style('display', 'block')
						.style('top', pointer(d, svg.node())[1] + 50 + 'px')
						.style('left', pointer(d, svg.node())[0] + 'px');
				})
				.on('mouseout', function (d) {
					select(this).style('fill', (d) => {
						if (d.value >= 75) {
							return '#ed8c15';
						} else if (d.value >= 50) {
							return '#f09e3a';
						} else if (d.value >= 25) {
							return '#edaa58';
						} else {
							return '#e8b77b';
						}
					});
					select(`#${id} .custom-tooltip`).style('display', 'none');
				});

			svg.selectAll('text').data(words).exit().remove();

			svg.selectAll('text').data(words).transition().duration(300);
		}
	}

	componentDidMount() {
		this.drawCloud();
	}

	componentDidUpdate() {
		this.drawCloud();
	}

	render() {
		const { id } = this.props;
		return (
			<div id={id} ref={this.myRef}>
				<CustomToolTip type={'word'} color='#ed8c15' />
			</div>
		);
	}
}
