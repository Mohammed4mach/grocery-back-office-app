import { useState } from 'react';
import { AddCross, CloseMinus } from './icons';

const FrequentQuestion = (props) => {
  let {className, question, answer} = props;
  className = className ?? '';

  const [shown, setShown] = useState(false);

  const Btn = shown ? CloseMinus : AddCross;

  return (
    <section
      {...props}
      className={`
        faq
        ${className}
      `}
    >
      <section className="faq__header">
        <h5 className="faq__question flex-center">
          {question}
        </h5>

        <Btn
          className="faq__toggle"
          onClick={() => setShown((prevState) => !prevState)}
        />
      </section>

      <section
        className="faq__body"
        style={{
          height: !shown ? 0 : '100%',
          marginBottom: !shown ? '8px' : '24px',
        }}
      >
        <p
          className="faq__answer"
        >
          {answer}
        </p>
      </section>
    </section>
  );
};

export default FrequentQuestion;

