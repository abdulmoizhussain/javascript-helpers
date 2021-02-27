class NumberHelper {
  /**
   * Prefixes a zero in the given number is if it is in the range: 0-9
   * @param {Number} value 
   */
  static toString(value) {
    const valueStr = value.toString();
    if (valueStr.length === 1) {
      return "0" + valueStr;
    }
    return valueStr;
  }
}
const shortWeekDayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
const fullWeekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
class DateExtended extends Date {
  // class private variable:
  // #ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;
  // #ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
  // #ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  constructor() {
    if (arguments[0] === undefined) {
      super();
    }
    else {
      super(...arguments);
    }
    this.ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;
    this.ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
    this.ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  }

  totalMilliseconds() { return new Date().getTime() - this.getTime(); }
  totalSeconds() { return this.totalMilliseconds() / 1000; }
  totalMinutes() { return this.totalSeconds() / 60; }
  totalHours() { return this.totalMinutes() / 60; }
  totalDays() { return this.totalHours() / 24; }

  /**
   * Adds/Subtracts given number of days in this instance and returns new instance.
   * @param {Number} days - Positive or Negative number of days.
   */
  addDays(days) {
    return new DateExtended(this.getTime() + (days * this.ONE_DAY_IN_MILLISECONDS));
  }

  /**
   * Adds/Subtracts given number of hours in this instance and returns new instance.
   * @param {Number} hours - Positive or Negative number of hours.
   */
  addHours(hours) {
    return new DateExtended(this.getTime() + (hours * this.ONE_HOUR_IN_MILLISECONDS));
  }

  /**
   * Adds/Subtracts given number of minutes in this instance and returns new instance.
   * @param {Number} minutes - Positive or Negative number of minutes.
   */
  addMinutes(minutes) {
    return new DateExtended(this.getTime() + (minutes * this.ONE_MINUTE_IN_MILLISECONDS));
  }

  /**
   * Adds/Subtracts given number of seconds in this instance and returns new instance.
   * @param {Number} seconds - Positive or Negative number of seconds.
   */
  addSeconds(seconds) {
    return new DateExtended(this.getTime() + (seconds * 1000));
  }

  getHoursOf12HourFormat() {
    const hours = this.getHours();
    if (hours == 0) {
      return 12;
    }
    if (hours > 12) {
      return hours - 12;
    }
    return hours;
  }

  getAmOrPmInShort() {
    if (this.getHours() < 13) {
      return "A";
    }
    return "P";
  }
  getAmOrPmInFull() {
    if (this.getHours() < 13) {
      return "AM";
    }
    return "PM";
  }

  /**
   * Every representative must be separated by a non-word character.
   * 
   * Non-word characters: ~!@#$%^&*()+`-=[]\;',./{}|:"<>? or a space.
   * 
   * d -> Represents the day of the month as a number from 1 through 31.
   * 
   * dd -> Represents the day of the month as a number from 01 through 31.
   * 
   * ddd-> Represents the abbreviated name of the day (Mon, Tues, Wed, etc).
   * 
   * dddd-> Represents the full name of the day (Monday, Tuesday, etc).
   * 
   * h-> 12-hour clock hour (e.g. 4).
   * 
   * hh-> 12-hour clock, with a leading 0 (e.g. 06).
   * 
   * H-> 24-hour clock hour (e.g. 15)
   * 
   * HH-> 24-hour clock hour, with a leading 0 (e.g. 22).
   * 
   * m-> Minutes
   * 
   * mm-> Minutes with a leading zero.
   * 
   * M-> Month number (eg.3)
   * 
   * MM-> Month number with leading zero(eg.04)
   * 
   * MMM-> Abbreviated Month Name (e.g. Dec)
   * 
   * MMMM-> Full month name (e.g. December)
   * 
   * s-> Seconds
   * 
   * ss-> Seconds with leading zero.
   * 
   * t-> Abbreviated AM / PM (e.g. A or P)
   * 
   * tt-> AM / PM (e.g. AM or PM)
   * 
   * yyy-> Year, (e.g. 2015)
   * 
   * yyyy-> Year, (e.g. 2015)
   * 
   * Source: https://www.c-sharpcorner.com/blogs/date-and-time-format-in-c-sharp-programming1
   * 
   * @param {String} stringToFormat 
   */
  format(stringToFormat) {
    if (/\byyyy\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\byyyy\b/g, this.getFullYear());
    }
    if (/\byyy\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\byyy\b/g, this.getFullYear());
    }

    if (/\bHH\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bHH\b/g, NumberHelper.toString(this.getHours()));
    }
    if (/\bH\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bH\b/g, this.getHours());
    }

    if (/\bhh\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bhh\b/g, NumberHelper.toString(this.getHoursOf12HourFormat()));
    }
    if (/\bh\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bh\b/g, this.getHoursOf12HourFormat());
    }

    if (/\bmm\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bmm\b/g, NumberHelper.toString(this.getMinutes()));
    }
    if (/\bm\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bm\b/g, this.getMinutes());
    }

    if (/\bss\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bss\b/g, NumberHelper.toString(this.getSeconds()));
    }
    if (/\bs\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bs\b/g, this.getSeconds());
    }

    if (/\bdddd\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bdddd\b/g, fullWeekDayNames[this.getDay()]);
    }
    if (/\bddd\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bddd\b/g, shortWeekDayNames[this.getDay()]);
    }
    if (/\bdd\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bdd\b/g, NumberHelper.toString(this.getDate()));
    }
    if (/\bd\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bd\b/g, this.getDate());
    }

    if (/\bMMMM\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bMMMM\b/g, fullMonthNames[this.getMonth()]);
    }
    if (/\bMMM\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bMMM\b/g, shortMonthNames[this.getMonth()]);
    }
    if (/\bMM\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bMM\b/g, NumberHelper.toString(this.getMonth() + 1));
    }
    if (/\bM\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bM\b/g, this.getMonth() + 1);
    }

    if (/\btt\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\btt\b/g, this.getAmOrPmInFull());
    }
    if (/\bt\b/g.test(stringToFormat)) {
      stringToFormat = stringToFormat.replace(/\bt\b/g, this.getAmOrPmInShort());
    }

    return stringToFormat;
  }

  /**
   * @param {Number} year
   * @param {Number} month - provide zero based month number (0-11)
   */
  getDaysOfAMonth(year, month) {
    // source: https://stackoverflow.com/a/222439
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Adds/Subtracts given number of months in this instance and returns new instance.
   * @param {Number} monthsToAdd - Positive or Negative number of months.
   */
  addMonths(monthsToAdd) {
    // source: https://stackoverflow.com/a/11500017
    const thisYear = this.getFullYear();
    const thisMonth = this.getMonth();

    const resultantYear = Math.floor(((thisYear * 12) + thisMonth + monthsToAdd) / 12);

    // source: https://stackoverflow.com/a/43794682
    if (resultantYear > 275760 || resultantYear < -271821) {
      throw "Invalid Date: Out of Range";
    }

    const resultantMonth = ((thisYear * 12) + thisMonth + monthsToAdd) % 12;

    let thisDate = this.getDate();
    if (thisDate > 28) {
      const resultantDate = this.getDaysOfAMonth(resultantYear, resultantMonth);
      if (resultantDate < thisDate) {
        thisDate = resultantDate;
      }
    }

    return new DateExtended(
      resultantYear,
      resultantMonth,
      thisDate,
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    );
  }
}

// console.log(new DateExtended(1000).totalMilliseconds());
// console.log(new DateExtended("2020-10-31T00:12:12").format('d dd ddd dddd h hh H HH m mm s ss M MM MMM MMMM t tt yyy yyyy'));
// console.log(new DateExtended("2020-10-01T13:12:12").format('d dd ddd dddd h hh H HH m mm s ss M MM MMM MMMM t tt yyy yyyy'));
// console.log(new DateExtended("2020-10-31T00:12:12").format('dd-mm-yyy'));
// console.log(new DateExtended("2020-10-31T00:12:12").format('dd/mm/yyy'));
// console.log(new DateExtended("2020-10-31T00:12:12").format('dd:mm:yyy'));
// console.log(new DateExtended("2020-10-31T00:12:12").format('dd!mm!yyy'));
// console.log(new DateExtended("2020-10-31T00:12:12").format("dd'mm'yyy"));
// console.log(new DateExtended("2020-10-31T00:12:12").format("dd`mm`yyy"));

// this case wont work because an underscore is a word-character, we need to separate them with a non-word character.
// console.log(new DateExtended("2020-10-31T00:12:12").format('dd_mm_yyy'));

// console.log(new DateExtended().addDays(1));
// console.log(new DateExtended().addHours(1));
// console.log(new DateExtended().addHours(-1));
// console.log(new DateExtended().addMinutes(1));
// console.log(new DateExtended().addMinutes(-1));
// console.log(new DateExtended().addSeconds(1));
// console.log(new DateExtended().addSeconds(-1));

// console.log(new Date(2020, 1, 31, 00, 12, 12).addMonths(0).format("dd-MM-MMM-yyy T HH mm ss"));
// console.log(new DateExtended(2020, 0, 29, 00, 12, 12).addMonths(1).format("dd-(MM-MMM)-yyyy"));