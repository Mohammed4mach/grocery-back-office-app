import { useState } from 'react';
import { H3, P, Button } from '@/components';
import {
  FormUnit,
  Password,
  Label,
} from '@/components/inputs';
import { AuthController } from '@/controllers';
import { useLoader } from '@/hooks';

const VerifyPassword = (props) =>
{
  let {className, onFailure, onSuccess} = props;
  const [error, setError] = useState('');
  const {showLoader, closeLoader} = useLoader();

  const submit = async (data) => {
    const password = data.get('password');

    showLoader();
    const res = await AuthController.login(password);
    closeLoader();

    if(res.status != 200)
    {
      setError('Error occured');

      if(onFailure instanceof Function)
        onFailure(res);
    }
    else
    {
      if(onSuccess instanceof Function)
        onSuccess(res);
    }
  };

  return (
    <form
      className={`flex flex-col gap-[56px] mb-[40px] ${className}`}
    >
      <section className="flex flex-col gap-[24px]">
        <H3>
          Verify Old Password
        </H3>

        <P gray3 medium center>For Security Reasons, Please Provide Your Existing Password.</P>
      </section>

      <section className="flex flex-col gap-[16px]">
        {error && <P className="clr-rejected w-full font-medium">{error}</P>}

        <FormUnit>
          <Label>Password</Label>
          <Password name="password" placeholder="Enter your password" required />
        </FormUnit>
      </section>

      <section>
        <Button
          className="p-[10px] w-[554px] h-[80px] btn--half-radius"
          submit={submit}
        >
          Next
        </Button>
      </section>
    </form>
  );
};

export default VerifyPassword;

