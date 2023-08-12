import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, updateProduct } from "../utils/api";
import { productSliceActions } from "../redux/product-slice";
import Layout from "../component/Layout";
import { useForm } from "react-hook-form";
import Input from "../component/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const product: any = useSelector((state) => state?.product);
  const configuration: any = useSelector((state) => state?.configuration);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { addProduct } = productSliceActions;
  const [entries, setEntries] = useState<any>({});

  const updateEntries = () => {
    if (product.id) {
      setEntries({
        name: product.name,
        description: product.description,
        video: product.video,
        investmentEffort: product.investmentEffort,
        businessModel1: product.businessModels[0].name,
        businessModel2: product.businessModels[1].name,
        businessModel3: product.businessModels[2].name,
        businessModel4: product.businessModels[3].name,
        categories1: product.categories[0].name,
        categories2: product.categories[1].name,
      });
    }
  };

  useEffect(() => {
    const productId = `6781`;
    const fetchProduct = async () => {
      if (product?.id) return;

      const response = await getProduct(productId);

      if (!response?.data) return;
      dispatch(addProduct(response?.data));
    };
    fetchProduct();
  }, [product]);

  const { register, handleSubmit } = useForm();

  const handleEditOnSubmit = async () => {
    if (!product.id) return;

    try {
      await updateProduct(product.id, entries);

      naviagte("/product");
      toast("Successfuly updated!");
    } catch (error) {
      updateEntries();
      toast.error("Failed to updat!", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  useEffect(() => {
    updateEntries();
  }, [product]);

  if (product.id) {
    return (
      <Layout>
        <form
          className="border border-gray-300 rounded-[0.5rem] bg-white mt-5 p-2 m-2 flex flex-col gap-3 lg:w-[600px]"
          onSubmit={handleSubmit(handleEditOnSubmit)}
        >
          <div> {`Edit ${product.name}`}</div>
          {Object.keys(entries).map((key, index) => {
            return (
              <Input
                key={index}
                register={register}
                name={key}
                placeholder={entries[key]}
                params={{ required: true }}
              />
            );
          })}
          <div className="flex justify-end">
            <button
              type="submit"
              className=" border-none py-2 px-12 rounded-[0.5rem] text-white w-[120px] mt-3"
              style={{ backgroundColor: configuration?.mainColor }}
            >
              Edit
            </button>
          </div>
        </form>
      </Layout>
    );
  } else {
    null;
  }
};

export default EditProduct;
