const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,

  getName(day)
  {
    switch(day)
    {
      case this.SUNDAY:
        return 'sunday';
      case this.MONDAY:
        return 'monday';
      case this.TUESDAY:
        return 'tuesday';
      case this.WEDNESDAY:
        return 'wednesday';
      case this.THURSDAY:
        return 'thursdat';
      case this.FRIDAY:
        return 'friday';
      case this.SATURDAY:
        return 'saturday';
    }
  },

  getShortName(day)
  {
    switch(day)
    {
      case this.SUNDAY:
        return 'sun';
      case this.MONDAY:
        return 'mon';
      case this.TUESDAY:
        return 'tue';
      case this.WEDNESDAY:
        return 'wd';
      case this.THURSDAY:
        return 'thur';
      case this.FRIDAY:
        return 'fri';
      case this.SATURDAY:
        return 'sat';
    }
  },
};

export default DaysOfWeek;

