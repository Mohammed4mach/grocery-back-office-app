import { useRef, useState } from 'react';
import { H3, P, A, Button } from '@/components';
import { WavingHand } from '@/components/icons';
import {
  FormUnit,
  Input,
  Password,
  Checkbox,
  Label,
} from '@/components/inputs';
import { AuthController } from '@/controllers';
import { useLoader } from '@/hooks';
import Auth from '@/utils/Auth';
import { Navigate } from 'react-router-dom';

const LoginPage = () =>
{
  if(Auth.authed())
    return <Navigate to="/dashboard" />

  const form   = useRef(null);
  const [error, setError] = useState('');
  const {showLoader, closeLoader} = useLoader();

  const submit = async (data) => {
    const username = data.get('username');
    const password = data.get('password');

    showLoader();
    const {error} = await AuthController.login(username, password);
    closeLoader();

    if(error)
    {
      setError(error);
      return;
    }
  };

  return (
    <form
      className="form-login px-[24px] mb-[32px] md:mb-[40px]"
      ref={form}
    >
      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Hello Again <WavingHand className="inline" />
        </H3>

        <P gray3 center>Let's pick up where you left off and make your business thrive.</P>
      </section>

      <section className="form-login__inputs">
        {error && <P className="clr-rejected w-full font-medium">{error}</P>}

        <FormUnit>
          <Label>Username</Label>
          <Input name="username" type="text" placeholder="Enter your username" required />
        </FormUnit>

        <FormUnit>
          <Label>Password</Label>
          <Password name="password" placeholder="Enter your password" required />
        </FormUnit>

        <div className="flex justify-start items-center self-start">
          <Checkbox name="remember_me" id="chk-remember" />
          <label htmlFor="chk-remember" className="chk-lbl ml-[4px] md:ml-[8px] no-select">
            Remember Me
          </label>
        </div>
      </section>

      <section className="form-login__footer">
        <Button submit={submit}>
          Login
        </Button>

        <div className="flex-center">
          <A
            onClick={() => alert('How dare you? Wait till we implement it!')}
            className="clr-gray3 text-[14px] md:text-[16px]"
          >
            Forgot Password?
          </A>
        </div>
      </section>
    </form>
  );
};

export default LoginPage;

