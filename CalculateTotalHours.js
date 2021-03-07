// calculate total hours;
times = [];
function calc(hours, minutes) {
    const temp = new Date(0);
    temp.setTime((hours * 60 * 60 * 1000) + (minutes * 60 * 1000));
    times.push(temp.getTime());
    
    const totalHours = times.reduce((accumulator, currentVal) => accumulator + currentVal, 0) / (1000 * 60 * 60);

    hours = Math.floor(totalHours);
    minutes = Math.floor((totalHours % 1) * 60);

    return `Total time: ${hours} hours ${minutes} minutes.`;
}
