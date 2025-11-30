import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoader } from '@/hooks';
import { Product } from '@/services';
import { Button, ArrowLeft } from '@/components/buttons';
import { H4, ProductForm, Modal } from '@/components';
import { InputMultiImg } from '@/components/inputs';

const EditPage = () =>
{
  const navigate                    = useNavigate();
  const {productId}                 = useParams();
  const {showLoader, closeLoader}   = useLoader();
  const [product, setProduct]       = useState({});
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    showLoader();

    Product.show(productId)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
        }

        setProduct(res.data ?? {});
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  const submit = async (data) => {
    showLoader();

    const body = {
      sku: data.get('sku'),
      name: data.get('name'),
      description: data.get('description'),
      unit: data.get('unit'),
      price: data.get('price'),
      stock: data.get('stock'),
      notes: data.get('notes'),
    };

    const res = await Product.edit(productId, body);

    closeLoader();

    if(res.status != 204)
    {
      alert(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    window.history.back();
  };

  const uploadPics = async (data) => {
    showLoader();
    const res = await Product.addPictures(data, productId);
    closeLoader();

    if(res.status != 204)
    {
      alert(res.data?.message ?? 'Unkown error, try again later');
      return;
    }

    window.location.reload();
  };

  return (
    <>
      <form className="form-login mt-[101px] mb-[100px] gap-0">
        <section
          className={`
            w-full flex-center flex-col
          `}
        >
          <section className="flex gap-[24px] w-[85.5%] mb-[64px]">
            <ArrowLeft
              className="w-[56px] h-[56px] flex-shrink-0"
              onClick={() => window.history.back()}
            />

            <section className="flex justify-center flex-col gap-[12px]">
              <H4 className="w-fit">
                Edit The Product
              </H4>
            </section>
          </section>

          <section className="flex flex-col gap-[56px]">
              <ProductForm
                product={product}
                submit={submit}
                preImgAdd={async () => {
                  setModalShown(true);

                  return false;
                }}
                preImgRemove={async (img) => {
                  const id = img?.id;

                  if(!id)
                    return true;

                  showLoader();
                  try
                  {
                    const res = await Product.removePicture(productId, id);

                    if(res.status != 204)
                    {
                      alert(res.data?.message ?? 'Unkown error, try again later');
                      closeLoader();
                      return false;
                    }
                  }
                  catch(e)
                  {
                    alert(e);
                    closeLoader();

                    return false;
                  }

                  closeLoader();

                  return true;
                }}
              />
          </section>
        </section>
      </form>

      <Modal shown={modalShown} close={() => setModalShown(false)}>
        <form className="">
          <InputMultiImg
            name="pictures"
            center
          />

          <Button
            className="btn--half-radius w-[554px] h-[80px] mt-[52px]"
            submit={uploadPics}
          >
            Upload
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditPage;

