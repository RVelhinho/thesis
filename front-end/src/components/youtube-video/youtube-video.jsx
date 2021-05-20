import React from 'react';
import PropTypes from 'prop-types';
import './youtube-video.scss';

const YoutubeVideo = ({ embedId }) => (
	<div className='video-responsive'>
		<iframe
			width='100%'
			height='100%'
			src={`https://www.youtube.com/embed/${embedId}`}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			title='Embedded youtube'
		/>
	</div>
);

YoutubeVideo.propTypes = {
	embedId: PropTypes.string.isRequired,
};

export default YoutubeVideo;
