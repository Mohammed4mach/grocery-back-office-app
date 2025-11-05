import {
  FormUnit,
  Label,
  Input,
  TextArea,
  InputMultiImg,
} from '@/components/inputs';
import { Button } from '@/components';
import add from '@/assets/icons/add-line-dark-gray-24.svg';

const ProductForm = (props) => {
  let { className, addProduct, submit, product, preImgAdd, preImgRemove, imgRequired } = props;

  className  = className ?? '';

  return (
    <section
      {...props}
      className={`
        product-form
        ${className}
      `}
    >
      <section className="product-form__imgs">
        <InputMultiImg
          name="pictures"
          defaultImgs={product?.pictures ?? []}
          preImgAdd={preImgAdd}
          preImgRemove={preImgRemove}
          required={imgRequired}
        />
      </section>

      <section className="flex flex-col gap-[48px] self-start">
        <section className="product-form__inputs">
          <div className="product-form__field">
            <FormUnit>
              <Label>Title</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                className=""
                defaultValue={product?.name ?? ''}
                required
              />
            </FormUnit>
          </div>

          <div className="product-form__field">
            <FormUnit>
              <Label>Unit</Label>
              <Input
                type="text"
                name="unit"
                placeholder="What is the quantity ?"
                className="!w-[269px]"
                defaultValue={product?.unit ?? ''}
                required
              />
            </FormUnit>
          </div>

          <div className="product-form__field">
            <FormUnit>
              <Label>SKU (Stock Keeping Unit)</Label>
              <Input
                type="text"
                name="sku"
                placeholder="SKU"
                defaultValue={product?.sku ?? ''}
              />
            </FormUnit>
          </div>

          <div className="product-form__field">
            <FormUnit>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                placeholder="How much ?"
                className="!w-[269px]"
                defaultValue={product?.price ?? ''}
                required
              />
            </FormUnit>

            <FormUnit>
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                placeholder="Stock..."
                className="!w-[269px]"
                defaultValue={product?.stock ?? ''}
                required
              />
            </FormUnit>
          </div>


          <div className="product-form__field">
            <FormUnit>
              <Label>Description</Label>
              <TextArea
                name="description"
                placeholder="Describe your product"
                defaultValue={product?.description ?? ''}
              ></TextArea>
            </FormUnit>
          </div>

          <div className="product-form__field">
            <FormUnit>
              <Label>Notes</Label>
              <TextArea
                name="notes"
                placeholder="Write notes that you want the customer to know if they order this product"
                defaultValue={product?.notes ?? ''}
              ></TextArea>
            </FormUnit>
          </div>
        </section>

        <section className="flex justify-end gap-[16px]">
          {
            addProduct ? (
              <Button
                secondary
                className="btn--half-radius gap-[10px] w-[554px] h-[80px]"
                onClick={addProduct}
              >
                <img src={add} alt="add icon" />
                <span>Add Product</span>
              </Button>
            ) : null
          }

          {
            submit ? (
              <Button
                className="btn--half-radius w-[554px] h-[80px]"
                submit={submit}
              >
                Save
              </Button>
            ) : null
          }
        </section>
      </section>
    </section>
  );
};

export default ProductForm;

