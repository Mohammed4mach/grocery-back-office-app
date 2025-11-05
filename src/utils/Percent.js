class Percent
{
  static fractionToString(fraction)
  {
    const _x100 = fraction * 100;

    return `${_x100}%`;
  }

  static stringToFraction(string)
  {
    const noPercent = string.replace('%', '');

    return Number(noPercent) / 100;
  }
}

export default Percent;

