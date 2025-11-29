import { useState } from 'react';
import { SuccessWithCheckmark } from '@/pages/includes';
import { H3, P, Button } from '@/components';
import {
  FormUnit,
  Password,
  Label,
} from '@/components/inputs';
import { User } from '@/services';
import { useLoader } from '@/hooks';

const EditPassword = () =>
{
  const [error, setError] = useState('');
  const [page, setPage]   = useState(0);
  const {showLoader, closeLoader} = useLoader();

  const onVerifySuccess = () => setPage(1);

  const submit = async (data) => {
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');

    showLoader();
    const res = await User.updatePassword(newPassword, oldPassword);
    closeLoader();

    if(res.status != 204)
    {
      setError(res.data?.detail ?? 'Unkown error, try again later');
      return;
    }

    setPage(1);
  };

  return (
    <section>
      {
        page == 0 ? (
            <form className="flex-center flex-col gap-[48px] md:gap-[56px] mb-[40px]">
              <section className="flex flex-col gap-[16px]">
                <H3>
                  Secure Your New Key
                </H3>

                <P gray3 medium center>Create a strong new password to regain control and unlock your account.</P>
              </section>

              <section className="flex flex-col gap-[16px] md:gap-[24px]">
                {error && <P className="clr-rejected w-full font-medium">{error}</P>}

                <FormUnit>
                  <Label>Current Password</Label>
                  <Password name="oldPassword" placeholder="Enter your current password" required />
                </FormUnit>

                <FormUnit>
                  <Label>Password</Label>
                  <Password name="newPassword" placeholder="Enter your new password" required />
                </FormUnit>

                <FormUnit>
                  <Label>Confirm Password</Label>
                  <Password name="passwordConfirmation" placeholder="Enter your new password" required />
                </FormUnit>
              </section>

              <section>
                <Button submit={submit} halfRadius>
                  Update
                </Button>
              </section>
            </form>
          ) :
        page == 1 ?
          <SuccessWithCheckmark
            message="Your password has been successfully changed."
          /> :
          null
      }
    </section>
  );
};

export default EditPassword;

