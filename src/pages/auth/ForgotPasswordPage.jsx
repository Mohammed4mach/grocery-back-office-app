import { H3, P, A, Button } from '@/components';
import {
  FormUnit,
  Input,
  Label,
} from '@/components/inputs';

const ForgotPasswordPage = () =>
{
  return (
    <form className="form-login px-[24px] mb-[32px] md:mb-[40px]">
      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Recover Your Access
        </H3>

        <P gray3 medium center>Tell us which username address belongs to your forgotten password.</P>
      </section>

      <section className="form-login__inputs">
        <FormUnit>
          <Label>Email</Label>
          <Input name="username" type="text" placeholder="Enter your username address" required />
        </FormUnit>
      </section>

      <section className="form-login__footer">
        <Button to="/reset-password">
          Send
        </Button>

        <div className="flex-center">
          <P gray3>
            Remember Password? <A to="/login">Log in</A>
          </P>
        </div>
      </section>
    </form>
  );
};

export default ForgotPasswordPage;

