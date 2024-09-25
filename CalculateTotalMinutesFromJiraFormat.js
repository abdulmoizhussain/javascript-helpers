function totMinutes(timeStr) {
    const pattern = /([0-9]+d)*\s*([0-9]+h)*\s*([0-9]+m)*\s*([0-9]+s)*/;
    const times = pattern.exec(timeStr);
    
    const dDay = times[1] || '0d';
    const hHour = times[2] || '0h';
    const mMinute = times[3] || '0m';
    const sSecond = times[4] || '0s';

    const intDay = parseInt(dDay.slice(0, -1)) * 60 * 60 * 24;
    const intHour = parseInt(hHour.slice(0, -1)) * 60 * 60;
    const intMinute = parseInt(mMinute.slice(0, -1)) * 60;
    const intSecond = parseInt(sSecond.slice(0, -1));

    const totalSeconds = intDay + intHour + intMinute + intSecond;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `Total seconds: ${totalSeconds}. ${totalMinutes}m ${remainingSeconds}s`;
}
