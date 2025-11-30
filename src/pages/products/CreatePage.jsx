import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '@/hooks';
import { H4, P } from '@/components';
import { Product } from '@/services';
import { ArrowLeft } from '@/components/buttons';
import { ProductForm } from '@/components';

const CreatePage = () =>
{
  const navigate                    = useNavigate();
  const {showLoader, closeLoader}   = useLoader();

  const submit = async (data) => {
    showLoader();
    const res = await Product.create(data);
    closeLoader();

    if(res.status != 201)
    {
      alert(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    navigate(`/dashboard/products`);
  };

  return (
    <form className="form-login px-[24px] mt-[101px] mb-[100px] gap-0">
      <section
        className={`
          w-full flex-center flex-col
        `}
      >
        <section className="flex gap-[16px] md:gap-[24px] min-w-[330px] w-[75%] md:w-[62.5%] mb-[40px] md:mb-[64px]">
          <ArrowLeft onClick={() => window.history.back()} />

          <section className="flex justify-center flex-col gap-[12px]">
          <H4 className="w-fit !text-left">
              Showcase Your Products
            </H4>

            <P gray4 medium>Upload individual product images and descriptions,to quickly stock your virtual store.</P>
          </section>
        </section>

        <section className="flex flex-col gap-[40px] md:gap-[56px]">
            <ProductForm
              submit={submit}
              imgRequired={true}
            />
        </section>
      </section>
    </form>
  );
};

export default CreatePage;

