import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Product as ProductModel } from '@/services';
import { useDashboardTitle } from '@/hooks';
import {
  P,
  ProductCard,
  DashboardTitle,
} from '@/components';
import { useLoader } from '@/contexts/loaderContext';
import add from '@/assets/icons/add-line-blue.svg';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts]   = useState([]);
  const {showLoader, closeLoader} = useLoader();

  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    if(setTitle instanceof Function)
      setTitle(() => (
        <section className="flex flex-col gap-[8px] md:gap-[12px]">
          <DashboardTitle>Products</DashboardTitle>

          <P className="text-[18px] sm:max-w-[300px] md:max-w-fit sm:text-[24px] lg:text-[28px] xl:text-[32px] clr-gray-dark">
            Master Your Stock, Maximize Your Margin
          </P>
        </section>
      ));
  }, [setTitle]);

  useEffect(() => {
    showLoader();

    ProductModel.index()
      .then(res => {

        if(res.status != 200)
        {
          alert(res.data?.message ?? 'Unkown error')
          navigate('/dashboard');
        }

        setProducts(res.data.data ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, []);

  return (
    <section className="flex flex-col gap-[48px] mt-[48px]">
      <section className="flex flex-col-reverse md:flex-row md:justify-between gap-[32px] md:gap-[64px]">
        <NavLink
          onClick={() => alert(`Coming Soon!`)}
          className="flex-center gap-[8px] w-fit ml-auto text-[20px] md:text-[24px] clr-main text-center cursor-pointer flex-shrink-0"
        >
          <img src={add} alt="add icon" />
          <span>Add new Product</span>
        </NavLink>
      </section>

      <section>
        {products.length ? (
          <section className="flex-center">
            <section className="flex-center gap-[24px] flex-wrap">
              {
                products.map(product => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        product_storage_type_id: product.product_storage_type_id,
                        product_storage_type_name: product.product_storage_type_name,
                      }}
                    />
                  )
                })
              }
            </section>
          </section>
        )
          :
        (
          <div className="flex-center min-h-[calc(100vh-467px)]">
            <P large gray0>No Products Found</P>
          </div>
        )}
      </section>
    </section>
  );
};

export default ProductsPage;

