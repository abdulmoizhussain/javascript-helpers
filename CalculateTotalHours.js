// calculate total hours;
times = [];
function calc(hours, minutes) {
  const tem = new Date(0);
  tem.setTime((hours*60*60*1000)+(minutes*60*1000));
  times.push(tem.getTime());
  return "Total Hours: " + times.reduce((accumulator, currentVal) => accumulator + currentVal, 0) / (1000*60*60);
}
