export const getTimeColor = (value) => {
    if (value >= 1985) {
        return '#283ade';
    } else if (value < 1985 && value >= 1960) {
        return '#4e5cde';
    } else if (value < 1960 && value >= 1935) {
        return '#7983e0';
    } else if (value < 1935) {
        return '#9da4e3';
    }
};