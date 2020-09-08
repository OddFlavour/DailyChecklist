function toDate(date) {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

function toDateParts(date) {
    const parts = date.split('-');

    return {
        year: parseInt(parts[0], 10),
        month: parseInt(parts[1], 10),
        day: parseInt(parts[2], 10)
    };
}

function validateDate(date) {
    const validDateRegex = new RegExp('\\d{4}-\\d{2}-\\d{2}');

    return validDateRegex.test(date);
}

module.exports = {
    toDate: toDate,
    toDateParts: toDateParts,
    validateDate: validateDate
};
