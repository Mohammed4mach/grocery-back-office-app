export const padZero = (value = '0') => ('0' + value).slice(-2);

export const nextDay = (day, _date = null) =>
{
  const date = _date instanceof Date ? _date : new Date();
  date.setDate(date.getDate() + (day+(7-date.getDay())) % 7);

  return date;
}

export const lastDay = (day, _date = null) =>
{
  const date = _date instanceof Date ? _date : new Date();
  date.setDate(date.getDate() - date.getDay() + day);

  return date;
}

export const getTimezone = (date) => {
  if(!(date instanceof Date))
    throw Error('date is not instance of Date class');

  const timezoneOffset = date.getTimezoneOffset();
  const minutes        = Math.abs(timezoneOffset % 60);
  const hours          = Math.floor((timezoneOffset - minutes) / -60);

  if(hours === 0 & minutes === 0)
    return "+00:00";

  let timezone = hours > 0 ? '+' : '-';

  if(Math.abs(hours) < 10)
    timezone += '0';

  timezone += `${Math.abs(hours)}:`;

  if(minutes < 10)
    timezone += '0';

  timezone += `${minutes}`;

  return timezone;
};

export const toLocaleISOString = (date, _timezone = null) => {
  if(!(date instanceof Date))
    throw Error('date is not instance of Date class');

  const year     = date.getFullYear();
  const month    = padZero(date.getMonth() + 1);
  const day      = padZero(date.getDate());
  const hours    = padZero(date.getHours());
  const minutes  = padZero(date.getMinutes());
  const timezone = _timezone ? _timezone : getTimezone(date);

  const iso = `${year}-${month}-${day}T${hours}:${minutes}${timezone}`;

  return iso;
}

