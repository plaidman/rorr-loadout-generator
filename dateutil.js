const monthLookup = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec',
];

export function toMonthDayString(date) {
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    return `${monthLookup[month]} ${day}${getOrdinal(day)}`;
}

function getOrdinal(num) {
    const units = num % 10;

    if (units === 1 && num !== 11) {
        return 'st';
    }

    if (units === 2 && num !== 12) {
        return 'nd';
    }

    if (units === 3 && num !== 13) {
        return 'rd';
    }

    return 'th';
}