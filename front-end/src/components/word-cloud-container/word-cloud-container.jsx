import React, { PureComponent } from 'react';
import _ from 'lodash';
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
		this.state = {
			hoveredWord: '',
			selectedWord: '',
			count: 0,
			state: 'initial',
		};
		this.replicatedData = undefined;
	}
	static propTypes = {};

	drawCloud(run) {
		const { id, data, threshold = 20, max } = this.props;
		const handleOverWord = this.handleOverWord;
		const handleClickWord = this.handleClickWord;
		const handleOverOutWord = this.handleOverOutWord;
		const selectedWord = this.state.selectedWord;
		const hoveredWord = this.state.hoveredWord;
		const myRef = this.myRef;
		const w = $(`#${id}`).width();
		const h = $(`#${id}`).height();

		const wordScale = scaleLinear().domain([0, 1]).range([10, 30]);

		const randomRotate = scaleLinear().domain([0, 1]).range([0, 90]);
		if (run === 'initial') {
			this.replicatedData = _.cloneDeep(data);
			cloud()
				.size([w, h])
				.words(this.replicatedData)
				.rotate(0)
				.fontSize((d) => wordScale(d.value / max))
				.padding(5)
				.on('end', draw)
				.start();
		}

		function draw(words) {
			let svg;
			if (select('.svg-container').size() == 0) {
				svg = select(myRef.current)
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
			} else {
				svg = select('.svg-container');
			}

			svg
				.selectAll('text')
				.data(words)
				.enter()
				.append('text')
				.style('font-size', (d) => d.size + 'px')
				.style('fill', (d) => {
					if (d.value / max >= 0.75) {
						return '#de2874';
					} else if (d.value / max >= 0.5) {
						return '#d64b85';
					} else if (d.value / max >= 0.25) {
						return '#d9759f';
					} else {
						return '#de97b5';
					}
				})
				.style('opacity', 0.7)
				.style('cursor', 'pointer')
				.attr('text-anchor', 'middle')
				.attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
				.text((d) => d.text);

			svg
				.selectAll('text')
				.data(words)
				.style('fill', (d) => {
					if (selectedWord === d.text) {
						return '#1d856a';
					} else if (hoveredWord === d.text) {
						return '#27b08c';
					} else if (d.value / max >= 0.75) {
						return '#2ad4a6';
					} else if (d.value / max >= 0.5) {
						return '#5ad6b5';
					} else if (d.value / max >= 0.25) {
						return '#80cfba';
					} else {
						return '#9fc9be';
					}
				})
				.on('mouseover', function (d) {
					select(this).style('fill', (d) => handleOverWord(d));
					select(`#${id} .custom-tooltip`)
						.style('display', 'block')
						.style('top', pointer(d, svg.node())[1] + 50 + 'px')
						.style('left', pointer(d, svg.node())[0] + 'px');
				})
				.on('mouseout', function (d) {
					select(this).style('fill', (d) => {
						return handleOverOutWord(d);
					});
					select(`#${id} .custom-tooltip`).style('display', 'none');
				})
				.on('click', function (d) {
					select(this).style('fill', (d) => {
						return handleClickWord(d);
					});
				});

			svg.selectAll('text').data(words).exit().remove();

			svg.selectAll('text').data(words).transition().duration(300);
		}
	}
	componentDidMount() {
		this.drawCloud('initial');
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.data, this.props.data)) {
			select('.svg-container').remove();
			this.drawCloud('initial');
		} else if (
			!_.isEqual(prevState.selectedWord, this.state.selectedWord) ||
			!_.isEqual(prevState.hoveredWord, this.state.hoveredWord) ||
			!_.isEqual(prevState.count, this.state.count)
		) {
			this.drawCloud('');
		}
	}

	handleOverWord = (d) => {
		let hoveredWord = this.state.hoveredWord;
		const selectedWord = this.state.selectedWord;
		hoveredWord = d.text;
		this.setState(() => {
			return { hoveredWord: d.text, count: d.value };
		});
		this.props.onMouseOverWordCloud();
		if (selectedWord === d.text) {
			return '#1d856a';
		} else if (hoveredWord === d.text) {
			return '#27b08c';
		} else if (d.value / this.props.max >= 0.75) {
			return '#2ad4a6';
		} else if (d.value / this.props.max >= 0.5) {
			return '#5ad6b5';
		} else if (d.value / this.props.max >= 0.25) {
			return '#80cfba';
		} else {
			return '#9fc9be';
		}
	};

	handleOverOutWord = (d) => {
		let hoveredWord = this.state.hoveredWord;
		const selectedWord = this.state.selectedWord;
		hoveredWord = '';
		this.setState(() => {
			return { hoveredWord: '', count: 0 };
		});
		if (selectedWord === d.text) {
			return '#1d856a';
		} else if (d.value / this.props.max >= 0.75) {
			return '#2ad4a6';
		} else if (d.value / this.props.max >= 0.5) {
			return '#5ad6b5';
		} else if (d.value / this.props.max >= 0.25) {
			return '#80cfba';
		} else {
			return '#9fc9be';
		}
	};

	handleClickWord = (d) => {
		let selectedWord = this.state.selectedWord;
		let hoveredWord = this.state.hoveredWord;
		if (selectedWord === d.text) {
			selectedWord = '';
			this.setState(() => {
				return { selectedWord: '' };
			});
			this.props.onClickWordCloud(d.text);
			if (selectedWord === d.text) {
				return '#1d856a';
			} else if (hoveredWord === d.text) {
				return '#27b08c';
			} else if (d.value / this.props.max >= 0.75) {
				return '#2ad4a6';
			} else if (d.value / this.props.max >= 0.5) {
				return '#5ad6b5';
			} else if (d.value / this.props.max >= 0.25) {
				return '#80cfba';
			} else {
				return '#9fc9be';
			}
		} else {
			selectedWord = d.text;
			this.setState(() => {
				return { selectedWord: d.text };
			});
			this.props.onClickWordCloud(d.text);
			if (selectedWord === d.text) {
				return '#1d856a';
			} else if (hoveredWord === d.text) {
				return '#27b08c';
			} else if (d.value / this.props.max >= 0.75) {
				return '#2ad4a6';
			} else if (d.value / this.props.max >= 0.5) {
				return '#5ad6b5';
			} else if (d.value / this.props.max >= 0.25) {
				return '#80cfba';
			} else {
				return '#9fc9be';
			}
		}
	};

	render() {
		const { id, tooltipType, color } = this.props;
		const { count, hoveredWord } = this.state;
		return (
			<div id={id} ref={this.myRef}>
				<CustomToolTip
					type={tooltipType}
					color={color}
					count={count}
					word={hoveredWord}
				/>
			</div>
		);
	}
}
