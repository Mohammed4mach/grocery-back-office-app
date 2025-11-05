import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import upload from '@/assets/icons/upload.svg';
import close from '@/assets/icons/close-line-24.svg';
import add from '@/assets/icons/add-line-gray4-24.svg';

const InputMultiImg = (props) => {
  let {className, preImgAdd, preImgRemove, defaultImgs, center} = props;
  className = className ?? '';

  const id = nanoid();

  const input                         = useRef(null);
  const [imgs, setImgs]               = useState([])
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setImgs(defaultImgs ?? []);
  }, [defaultImgs]);

  return (
    <section
        className={`
          input-multi-img__container
          ${center ? 'items-center' : ''}
          ${className}
        `}
    >
      <input
        {...props}
        id={id}
        type="file"
        className="input-multi-img__input"
        ref={input}
        onChange={({ target }) => {
          if(!target.files.length || (target.files[0] == imgs[0]))
            return

          setImgs(prev => {
            const data  = new DataTransfer();
            const value = [...(new Set([...prev, ...target.files]))];

            value.forEach(file => data.items.add(file));

            target.files = data.files;

            return value;
          });
        }}
        multiple
      />

      <div className="input-multi-img__img">
        {
          imgs.length ? (
            <>
              <div
                className="input-multi-img__img__close"
                onClick={async () => {
                  if(preImgRemove instanceof Function)
                    if(!await preImgRemove(imgs[activeIndex]))
                      return null;

                  setImgs(prev => prev.filter((_, i) => i != activeIndex));
                  setActiveIndex(0);
                }}
              >
                <img src={close} alt="close icon" />
              </div>

              <img
                src={imgs[activeIndex] instanceof File ? URL.createObjectURL(imgs[activeIndex]) : imgs[activeIndex].url}
                alt="selected image"
                className="input-multi-img__img__img"
              />
            </>
          ) : (
            <label className="w-full h-full flex-center cursor-pointer" htmlFor={id}>
              <img
                src={upload}
                alt="upload icon"
              />
            </label>
          )
        }
      </div>

      <section className="input-multi-img__imgs">
        {
          imgs.map((img, i) => {
            const src = img instanceof File ? URL.createObjectURL(img) : img.url;
            const key = nanoid();

            return (
              <div
                key={key}
                className={`
                  input-multi-img__imgs__img
                  ${i == activeIndex ? 'input-multi-img__imgs__img' : ''}
                `}
                onClick={() => setActiveIndex(i)}
              >
                <img
                  src={src}
                  alt="selected image"
                  className="input-multi-img__imgs__img__img object-cover"
                />
              </div>
            );
          })
        }

        {
          imgs.length ? (
            <div
              className="input-multi-img__imgs__img flex-center"
              onClick={async () => {
                  if(preImgAdd instanceof Function)
                    if(!await preImgAdd(imgs[activeIndex]))
                      return null;

                    input.current?.click();
              }}
            >
              <img
                src={add}
                alt="add icon"
              />
            </div>
          ) : null
        }
      </section>
    </section>
  );
};

export default InputMultiImg;

