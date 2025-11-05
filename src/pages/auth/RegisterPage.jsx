import { H3, P, Button } from '@/components';
import { WavingHand } from '@/components/icons';
import {
  FormUnit,
  Input,
  Password,
  Label,
} from '@/components/inputs';
import { useState } from 'react';
import AuthController from '@/controllers/AuthController';
import { useLoader } from '@/contexts/loaderContext';

const RegisterPage = () =>
{
  const [error, setError]         = useState('');
  const {showLoader, closeLoader} = useLoader();

  const submit = async (data) => {
    const fullname             = data.get('fullname');
    const phone            = data.get('phone');
    const username            = data.get('username');
    const password         = data.get('password');
    const confirm_password = data.get('password_confirmation');

    if(password !== confirm_password)
    {
      setError('Password and confirmation do not match');
      return;
    }

    showLoader();
    const {error} = await AuthController.register(fullname, username, password, phone);
    closeLoader();

    if(error)
    {
      setError(error);
      return;
    }

    window.location.href = '/register/success';
  };

  return (
    <form className="form-login px-[24px] mb-[32px] md:mb-[40px]">
      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Welcome Here <WavingHand className="inline" />
        </H3>

        <P gray3 center>Dive into the world of BotCart by creating your account now.</P>
      </section>

      <section className="form-login__inputs">
        {error && <P error>{error}</P>}

        <FormUnit>
          <Label>Fullname</Label>
          <Input name="fullname" type="text" placeholder="Enter your name" required />
        </FormUnit>

        <FormUnit>
          <Label>Username</Label>
          <Input name="username" type="text" placeholder="Enter your username address" required />
        </FormUnit>

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
        <Button submit={submit}>
          Add
        </Button>
      </section>
    </form>
  );
};

export default RegisterPage;

