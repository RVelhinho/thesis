import React from 'react';
import PropTypes from 'prop-types';
import ReactWordCloud from 'react-wordcloud';
import './word-cloud-container.scss';

const WordCloudContainer = React.memo(({ callbacks, options, size, words }) => {
	return (
		<ReactWordCloud
			callbacks={callbacks}
			options={options}
			size={size}
			words={words}
		/>
	);
});

WordCloudContainer.propTypes = {};

export default WordCloudContainer;
