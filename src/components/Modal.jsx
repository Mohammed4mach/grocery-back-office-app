import { useRef } from 'react';
import closeIcon from '@/assets/icons/close-fill-black-40.svg';

const Modal = (props) => {
  let {className, children, shown, close, hideClose, noClose} = props;
  className = className ?? '';

  const outer = useRef(null);

  return (
    <div
      {...props}
      ref={outer}
      className={`
        modal
        ${shown ? '' : '!hidden'}
      `}
      onClick={(e) => {
        if(!noClose && e.target === outer.current)
          close();
      }}
    >
      <section className="modal__body">
        {
          !hideClose && (
            <div className="modal__close-btn">
              <img
                src={closeIcon}
                alt="Close modal button"
                onClick={close}
              />
            </div>
          )
        }

        <section
          className={`
            modal__content
            ${className}
          `}
        >
          {children}
        </section>
      </section>
    </div>
  );
};

export default Modal;

