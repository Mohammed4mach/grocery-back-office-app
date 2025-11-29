import { useEffect, useState } from 'react';
import { H3, P } from '@/components';
import { Success } from '@/components/icons';
import { User } from '@/services';
import { useLoader } from '@/hooks';

const RegisterSuccessPage = () =>
{
  const [user, setUser] = useState({});
  const {showLoader, closeLoader}   = useLoader();

  useEffect(() => {
    showLoader();

    User.getMe()
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.detail ?? 'Unkown error')
          navigate('/');
        }

        setUser(res.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  return (
    <form className="form-login mb-[40px]">
      <section className="flex-center">
        <Success />
      </section>

      <section>
        <H3 className="mb-[8px] md:mb-[16px]">
          Welcome {user.name?.split(' ')[0] ?? 'User'}!
        </H3>

        <P gray3 center medium>Begin crafting your vision into reality.</P>
      </section>
    </form>
  );
};

export default RegisterSuccessPage;

