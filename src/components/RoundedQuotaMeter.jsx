import { useEffect, useRef, Fragment } from 'react';
import rod1 from '@/assets/icons/rods/_.svg';
import rod2 from '@/assets/icons/rods/_-1.svg';
import rod3 from '@/assets/icons/rods/_-2.svg';
import rod4 from '@/assets/icons/rods/_-3.svg';
import rod5 from '@/assets/icons/rods/_-4.svg';
import rod6 from '@/assets/icons/rods/_-5.svg';
import rod7 from '@/assets/icons/rods/_-6.svg';
import rod8 from '@/assets/icons/rods/_-7.svg';
import rod9 from '@/assets/icons/rods/_-8.svg';

const RoundedQuotaMeter = (props) => {
  let {className} = props;
  className = className ?? '';

  const canvas                    = useRef(null);
  const {title, total, remaining} = props;
  const rods                      = [
    rod1, rod2, rod3,
    rod4, rod5, rod6,
    rod7, rod8, rod9,
  ];

  const draw = (ctx, width, height, radius, startAngle, endAngle, finalAngle, incRate) => {
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.arc(width / 2, height / 2, radius, startAngle, endAngle);
    ctx.stroke();

    if(endAngle >= (finalAngle * 0.81) && incRate > 0.001)
      incRate *= 0.95;

    if(endAngle <= finalAngle)
    {
      const newEndAngle = endAngle + (finalAngle * incRate);
      requestAnimationFrame(() => draw(ctx, width, height, radius, startAngle, newEndAngle, finalAngle, incRate));
    }
  };

  const animate = (ctx) => {
    const width      = canvas.current.clientWidth;
    const height     = canvas.current.clientHeight;
    const radius     = 166 / 2;
    const full       = Math.PI * 2;
    const percent    = remaining / total;

    const incRate    = 0.01;
    const startAngle = 0;
    const finalAngle = full * percent;
    const endAngle   = finalAngle * incRate;

    draw(ctx, width, height, radius, startAngle, endAngle, finalAngle, incRate);
  };

  useEffect(() => {
    if(!canvas.current)
      return;

    canvas.current.width  = canvas.current.clientWidth;
    canvas.current.height = canvas.current.clientHeight;

    const ctx    = canvas.current.getContext('2d');

    ctx.strokeStyle = '#007AEA';
    ctx.lineWidth   = 9;
    ctx.lineCap     = 'round';

    animate(ctx);
  }, [remaining, total]);

  return (
    <div
      {...props}
      className={`
        rounded-quota-meter
        ${className}
      `}
    >
      <div className="rounded-quota-meter__body">
        <section className="rounded-quota-meter__content">
          <div className="flex items-end gap-[2px]">
            <h6 className="rounded-quota-meter__quota__remaining">
              {remaining.toLocaleString('en-US')}
            </h6>

            <span>{title}</span>
          </div>

          <div className="flex-center">
            remaining of
          </div>

          <div className="flex items-end gap-[2px]">
            <h6 className="rounded-quota-meter__quota__total">
              {
                total.toLocaleString('en-US')
              }
            </h6>

            <span>{title}</span>
          </div>
        </section>
      </div>

      {
        rods.map((rod, i) => (
          <Fragment key={i}>
            <img
              src={rod}
              className={`rounded-quota-meter__rod rounded-quota-meter__rod--${i + 1}`}
              alt="rod"
            />

            <img
              src={rod}
              className={`rounded-quota-meter__rod rounded-quota-meter__rod--${i + 1} rounded-quota-meter__rod--${i + 1}--inverted`}
              alt="rod"
            />
          </Fragment>
        ))
      }

      <canvas ref={canvas} className="rounded-quota-meter__canvas"></canvas>
    </div>
  );
};

export default RoundedQuotaMeter;

