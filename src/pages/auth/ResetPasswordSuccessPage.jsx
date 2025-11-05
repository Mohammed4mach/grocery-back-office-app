import { H3, P, Button } from '@/components';
import { Success, WavingHand } from '@/components/icons';

const ResetPasswordSuccessPage = () =>
{
  return (
    <form className="form-login px-[24px] mb-[32px] md:mb-[40px]">
      <section className="flex-center">
        <Success />
      </section>

      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Welcome Back! <WavingHand className="inline" />
        </H3>

        <P gray3 center medium>Your password has been successfully changed.</P>
      </section>

      <section className="form-login__footer">
        <Button to="/login">
          Back to login
        </Button>
      </section>
    </form>
  );
};

export default ResetPasswordSuccessPage;

