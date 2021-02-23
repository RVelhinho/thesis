export const getRandomValue = (minValue, maxValue, toFixed) => {
    return (Math.random() * (maxValue - minValue) + minValue).toFixed(toFixed);
}

export const getRoundedValue = (value, type) => {
    let str,
        suffix = '';
    let prefix = '';

    value = +value;
    let factor = Math.pow(10, 1);

    if (value >= 1000000000) {
        suffix = 'B';
        str = Math.floor(value / (1000000000 / factor)) / factor;
    } else if (value >= 1000000) {
        suffix = 'M';
        str = Math.floor(value / (1000000 / factor)) / factor;
    } else if (value >= 1000) {
        suffix = 'K';
        str = Math.floor(value / (1000 / factor)) / factor;
    } else if (value >= 0) {
        str = Math.floor(value).toString();
    }

    return prefix + str + suffix;
};
