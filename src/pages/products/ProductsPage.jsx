import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Product as ProductModel } from '@/services';
import { useDashboardTitle } from '@/hooks';
import {
  P,
  ProductCard,
  DashboardTitle,
} from '@/components';
import { Search } from '@/components/inputs';
import { useLoader } from '@/contexts/loaderContext';
import add from '@/assets/icons/add-line-blue.svg';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts]   = useState([]);
  const [sku, setSku]             = useState('');
  const [skuTimer, setSkuTimer]   = useState(null);
  const {showLoader, closeLoader} = useLoader();

  const {setTitle} = useDashboardTitle();

  useEffect(() => {
    setTitle(() => <DashboardTitle>Products</DashboardTitle>);
  }, []);

  useEffect(() => {
    showLoader();

    const options = {
      sku,
      limit: limit,
      offset: offset,
    };

    ProductModel.index(options)
      .then(res => {
        if(res.status != 200)
        {
          alert(res.data?.detail ?? 'Unkown error')
          navigate('/dashboard');
        }

        setProducts(res.data.items ?? []);
      })
      .catch(alert)
      .finally(() => closeLoader());
  }, [sku, limit, offset]);

  return (
    <section className="flex flex-col gap-[48px] mt-[48px]">
      <section className="flex flex-col-reverse md:flex-row md:justify-between gap-[32px] md:gap-[64px]">
        <Search
          className="!w-full sm:!w-[80%] md:!w-[57.1%] !h-[64px] font-s !gap-[8px]"
          placeholder="Search by SKU"
          onChange={({ target }) => {
            clearTimeout(skuTimer);

            if(!target.checkValidity())
              return;

            const timerId = setTimeout(() => setSku(target.value), 600);

            setSkuTimer(timerId);
          }}
        />

        <NavLink
          to={`/products/create`}
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
                      customerView={false}
                      product={{
                        id: product.id,
                        sku: product.sku,
                        name: product.name,
                        description: product.description,
                        notes: product.notes,
                        price: product.price,
                        stock: product.stock,
                        currency: product.currency,
                        pictures: product.pictures,
                        updatedAt: product.updatedAt,
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

