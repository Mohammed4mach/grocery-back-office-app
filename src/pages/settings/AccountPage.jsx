import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/services';
import Auth from '@/utils/Auth';
import { useLoader, useDashboardTitle } from '@/hooks';
import { A, P, Modal, Button, DashboardTitle } from '@/components';
import { FormUnit, Label, Input, Password } from '@/components/inputs';

const AccountPage = () =>
{
  const [user, setUser]           = useState({});
  const [timer, setTimer]         = useState(undefined);
  const [refresh, setRefresh]     = useState(false);
  const form                      = useRef(null);
  const navigate                  = useNavigate();
  const {showLoader, closeLoader} = useLoader();

  const [deleteModalShown, setDeleteModalShown] = useState(false);

  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => <DashboardTitle>My Account</DashboardTitle>);
  }, [setTitle]);

  useEffect(() => {
    showLoader();
    User.getMe()
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
        }

        setUser(res.data.data ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [refresh]);

  const submit = async (data) => {
    showLoader();

    const body = {
      name: data.get('name'),
      phone: data.get('phone'),
    };

    const res = await User.editMyInfo(body);

    closeLoader();

    if(res.status != 204)
    {
      alert(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    setRefresh(!refresh);
  };

  const onFieldChange = () => {
    if(!form?.current)
      return;

    clearTimeout(timer);

    const formdata = new FormData(form.current);
    const timerId  = setTimeout(() => submit(formdata), 400)

    setTimer(timerId);
  }

  const deleteAccount = async () => {
    showLoader();

    const res = await User.delete();

    closeLoader();

    if(res.status != 202)
    {
      alert(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    window.location.href = '/';
  };

  return (
    <section className="account-page">
      <section className="account-page__info">
        <form ref={form} className="flex flex-col gap-[41px]">
          <section className="account-page__info__form">
            <section className="flex flex-col gap-[16px]">
              <FormUnit>
                <Label>Fullname</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  defaultValue={user.fullname ?? ''}
                  onChange={onFieldChange}
                  required
                />
              </FormUnit>

              <FormUnit>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  defaultValue={user.username ?? ''}
                  onChange={onFieldChange}
                  required
                />
              </FormUnit>
            </section>
          </section>

          <section className="flex flex-col gap-[16px]">
            <A
              to="/my-account/password/edit"
              className="w-fit clr-gray-dark !no-underline font-s cursor-pointer"
            >
              <span>Change Password</span>
            </A>
          </section>
        </form>

        <Modal
          shown={deleteModalShown}
          close={() => setDeleteModalShown(false)}
          className="!px-[112px] !py-[74px]"
        >
          <section className="flex flex-col gap-[48px]">
            <section className="flex flex-col gap-[12px]">
              <h4 className="clr-black !text-[32px] font-[600]">Delete your Account</h4>
              <P className="!text-[17px]" gray3>For Security Reasons, Please Provide Your Existing Password.</P>
            </section>

            <section>
              <FormUnit>
                <Label>Password</Label>
                <Password
                  name="password"
                  placeholder="Enter your password"
                />
              </FormUnit>
            </section>

            <section>
              <Button
                className="btn--half-radius p-[10px] w-[554px] h-[80px]"
                submit={deleteAccount}
              >
                Delete
              </Button>
            </section>
          </section>
        </Modal>
      </section>
    </section>
  );
};

export default AccountPage;

