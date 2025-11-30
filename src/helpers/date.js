import { pad } from './strings';

export const formatDate = function (date)
{
  const dateObj = new Date(date);

  const year    = dateObj.getFullYear();
  const month   = pad(dateObj.getMonth() + 1);
  const day     = pad(dateObj.getDate());
  const hours   = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());

  const formDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formDate;
}

