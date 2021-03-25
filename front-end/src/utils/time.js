export const getTimeColor = (value) => {
	if (value >= 1985) {
		return '#9d33d6';
	} else if (value < 1985 && value >= 1960) {
		return '#ad60d6';
	} else if (value < 1960 && value >= 1935) {
		return '#bb92d1';
	} else if (value < 1935) {
		return '#c7bacf';
	}
};
