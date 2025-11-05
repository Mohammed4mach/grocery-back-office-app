import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Product as ProductModel } from '@/models';
import { useLoader } from '@/contexts/loaderContext';
import { Nav } from '@/sections/customer';
import { ProductCard  } from '@/components';
import { PlatformChatIcon } from "@/components/icons";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts]   = useState([]);
  const {showLoader, closeLoader} = useLoader();

  useEffect(() => {
    showLoader();

    const options = {
      limit,
      offset,
    };

    ProductModel.index(options, false)
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
  }, [limit, offset]);

  return (
    <section>
      <Nav />

      <section>
        {products.length ? (
          <section className="flex-center flex-col gap-[48px]">
            <section className="flex-center gap-[24px] flex-wrap">
              {
                products.map(product => {
                  return (
                    <ProductCard
                      key={product.id}
                      customerView={true}
                      product={{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        notes: product.notes,
                        price: product.price,
                        stock: product.stock,
                        currency: product.currency,
                        oldPrice: product.oldPrice,
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
          <h3 className="font-m clr-gray2 flex-center">No products</h3>
        )}
      </section>

      <NavLink className="fixed right-[5%] bottom-[5%]">
        <PlatformChatIcon />
      </NavLink>
    </section>
  );
};

export default ProductsPage;

