const isNumeric = (num) => {
    return !isNaN(num);
};

const isArrayEmpty = (array) => {
    return Array.isArray(array) && !array.length;
};

const isArrayNotEmpty = (array) => {
    return !isArrayEmpty(array);
};
module.exports = {
    isNumeric,
    isArrayEmpty,
    isArrayNotEmpty,
};
