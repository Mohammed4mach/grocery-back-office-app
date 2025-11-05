import { H3, P, Button } from '@/components';
import {
  FormUnit,
  Password,
  Label,
} from '@/components/inputs';

const ResetPasswordPage = () =>
{
  return (
    <form className="form-login px-[24px] mb-[32px] md:mb-[40px]">
      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Secure Your New Key
        </H3>

        <P gray3 medium center>Create a strong new password to regain control and unlock your account.</P>
      </section>

      <section className="form-login__inputs">
        <FormUnit>
          <Label>Password</Label>
          <Password name="password" placeholder="Enter your password" required />
        </FormUnit>

        <FormUnit>
          <Label>Confirm Password</Label>
          <Password name="password_confirmation" placeholder="Enter your password" required />
        </FormUnit>
      </section>

      <section className="form-login__footer">
        <Button to="/reset-password/success">
          Reset
        </Button>
      </section>
    </form>
  );
};

export default ResetPasswordPage;

