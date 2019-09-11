class DateExtended {
  constructor(date) {
    this.$ = typeof date === "undefined" ? new Date() : new Date(date);
  }
  totalTime() { return new Date().getTime() - this.$.getTime(); }
  totalSeconds() { return this.totalTime() / 1000; }
  totalMinutes() { return this.totalSeconds() / 60; }
  totalHours() { return this.totalMinutes() / 60; }
  totalDays() { return this.totalHours() / 24; }
}
