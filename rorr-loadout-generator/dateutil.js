import { DateTime } from 'https://cdn.jsdelivr.net/npm/luxon@3.4.4/+esm'

export function monthDayString(addDays = 0) {
    const day = DateTime.utc().startOf('day').plus({ day: addDays });
    return `${day.toFormat('LLL d')}${getOrdinal(day.day)}`;
}

export function seedString(addDays = 0) {
    const day = DateTime.utc().startOf('day').plus({ day: addDays });
    return day.toUnixInteger();
}

export function getTimerData() {
    const now = DateTime.utc();

    const nextDay = now.startOf('day').plus({ day: 1 });
    const duration = nextDay.diff(now).shiftTo('hours', 'minutes');
    let minutes = Math.ceil(duration.minutes);
    let hours = duration.hours;

    const nextMinute = now.startOf('minute').plus({ minute: 1 });
    const millis = nextMinute.diff(now).milliseconds;

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    return { millis, minutes, hours };
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