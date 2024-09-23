function totMinutes(timestr) {
    const fff = /([0-9]+d)*\s*([0-9]+h)*\s*([0-9]+m)*\s*([0-9]+s)*/;
    const time1 = fff.exec(timestr);
    const dDay = time1[1] || '0d';
    const hHour = time1[2] || '0h';
    const mMinute = time1[3] || '0m';
    const sSecond = time1[4] || '0s';

    const intDay = parseInt(dDay.slice(0, -1)) * 60 * 60 * 24;
    const intHour = parseInt(hHour.slice(0, -1)) * 60 * 60;
    const intMinute = parseInt(mMinute.slice(0, -1)) * 60;
    const intSecond = parseInt(sSecond.slice(0, -1));

    const totalSeconds = intDay + intHour + intMinute + intSecond;

    return totalSeconds / 60;
}
