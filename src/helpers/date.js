import { pad } from './strings';

export const getMonthName = () => {
  if(date === undefined)
    return '';

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const dateObj = new Date(date);
  const month   = months[ dateObj.getMonth() ];

  return month;
}

export const getDayOfWeek = (date) =>
{
  if(date === undefined)
    return '';

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const dateObj = new Date(date);
  const day     = days[ dateObj.getDay() ];

  return day;
}

export const formatDate = (date) =>
{
  if(date === undefined)
    return '';

  const dateObj = new Date(date);

  const year    = dateObj.getFullYear();
  const month   = pad(dateObj.getMonth() + 1);
  const day     = pad(dateObj.getDate());
  const hours   = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());

  const formDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formDate;
};

export const formatTime = (time) =>
{
  if(typeof time !== 'string')
    return '';

  const [all, hours, minutes] = time.match(/(\d+):(\d+):\d+/);

  return `${hours}:${minutes}`;
}

