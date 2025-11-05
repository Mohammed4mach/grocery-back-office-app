import { H3, P, Button } from '@/components';
import { Success } from '@/components/icons';

const SuccessWithCheckmark = (props) =>
{
  let {className, message} = props;

  return (
    <form
      className={`form-login mb-[40px] ${className}`}
    >
      <section className="flex-center">
        <Success />
      </section>

      <section>
        <H3 className="mb-[8px] md:mb-[12px]">
          Welcome Back!
        </H3>

        <P gray3 center large>{message}</P>
      </section>

      <section className="form-login__footer">
        <Button to="/dashboard" halfRadius>
          Back to Dashboard
        </Button>
      </section>
    </form>
  );
};

export default SuccessWithCheckmark;

