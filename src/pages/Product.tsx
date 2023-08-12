import { useEffect, useMemo } from "react";
import Layout from "../component/Layout";
import { getProduct } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { productSliceActions } from "../redux/product-slice";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineArrowRight, AiFillSetting } from "react-icons/ai";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import YouTube from "react-youtube";
import { formYoutubeUrl } from "../utils/helper";
import { FaChessKnight } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { BiTime } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const productId = `6781`;
  const { addProduct } = productSliceActions;
  const product: any = useSelector((state) => state?.product);
  const configuration: any = useSelector((state) => state?.configuration);
  const navigate = useNavigate();

  const handleEditProduct = () => {
    navigate("/product/edit");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (product?.id) return;

      const response = await getProduct(productId);

      if (!response?.data) return;
      dispatch(addProduct(response?.data));
    };
    fetchProduct();
  }, [product]);

  const pin = useMemo(
    () => ({
      lat: Number?.(product.id ? product?.company.address.latitude : 0),
      lng: Number?.(product.id ? product?.company.address.longitude : 0),
    }),
    [product]
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBsAKJMxJHhogrYKHtA4heWY9BKalIWCGA",
  });

  if (product.id && isLoaded) {
    return (
      <Layout>
        <div className=" flex flex-col gap-4 w-full lg:max-w-[800px]">
          <div className="flex gap-3 items-center text-sm">
            <BiHomeAlt2 />
            <AiOutlineArrowRight />
            <p>Offers</p>
            <AiOutlineArrowRight />
            <p>{product?.name}</p>
            <button
              type="button"
              className=" border-none py-2 px-12 rounded-[0.5rem] text-white"
              style={{ backgroundColor: configuration?.mainColor }}
              onClick={handleEditProduct}
            >
              Edit
            </button>
          </div>
          <div className="flex px-2 flex-col md:flex-row border border-gray-300 rounded-[0.5rem] bg-white mt-5 p-2 m-2">
            <div className="flex-[2.5] flex flex-col md:border-r-[1px]">
              <div className="flex-1">
                <div>
                  <img
                    src={product?.picture}
                    alt="product"
                    className=" object-contain h-[250px] w-full"
                  />
                </div>
              </div>
              <div className="flex1">
                <h3 className="py-1">{product?.name}</h3>

                <p className="text-[12px] py-2">{product?.description}</p>
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col text-sm justify-between">
              <p>Offered By</p>
              <div className=" flex items-center  py-2">
                <img src={product?.company?.logo} className=" h-6" />
              </div>
              <section>
                <div className=" flex items-center">
                  <div className=" flex items-center justify-center py-2">
                    <img
                      src={product?.user?.profilePicture}
                      className="rounded-full w-12"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm">{product?.user?.firstName}</h3>
                    <p className="text-sm">{product?.company?.name}</p>
                  </div>
                </div>
              </section>
              <p>
                {product?.company?.address?.house}{" "}
                {product?.company?.address?.street}
              </p>
              <p>
                {product?.company?.address?.zipCode}{" "}
                {product?.company?.address?.city.name}{" "}
                {product?.company?.address?.country.name}
              </p>
              <div className="p-4 w-full">
                <GoogleMap
                  zoom={13}
                  center={pin}
                  mapContainerClassName="w-full h-64"
                >
                  <Marker position={pin} />
                </GoogleMap>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-[0.5rem] bg-white mt-5 p-2 m-2">
            <h5 className="font-bold">Video</h5>
            <section className="flex justify-center items-center ">
              <YouTube
                className="w-full p-7"
                videoId={formYoutubeUrl(product.video)}
                loading="lazy"
                iframeClassName="w-full h-[500px]"
              />
            </section>
          </div>
          <section className="border border-gray-300 bg-white mt-5 p-3 rounded-[0.5rem] m-2 ">
            <h5 className="font-bold text-md">Offer Details</h5>
            <div className="flex flex-col lg:flex-row flex-between flex-wrap p-2">
              <div className="basis-1/2">
                <h6 className="text-gray-600 flex items-center gap-3">
                  <AiFillSetting /> Technologies
                </h6>
                <div className="flex flex-wrap text-sm">
                  {product?.categories?.map((item: any) => (
                    <p
                      className="border rounded-3xl bg-neutral-200 p-2 m-2 text-gray-500 text-[12px] px-3"
                      key={item.id}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="basis-1/2">
                <h5 className="text-gray-600 flex items-center gap-3">
                  <FaChessKnight /> Business model
                </h5>
                <div className="flex flex-wrap text-[12px]">
                  {product?.businessModels.map((item: any) => (
                    <p
                      className="border  rounded-3xl bg-neutral-200 p-3 m-2 text-gray-500"
                      key={item.id}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="basis-1/2">
                <h5 className="text-gray-600 flex items-center gap-3">
                  <BiTime /> TRL
                </h5>
                <div className="flex flex-wrap text-[12px]">
                  <p className="border  rounded-3xl bg-neutral-200 p-3 m-2 text-gray-500">
                    {product?.trl?.name}
                  </p>
                </div>
              </div>
              <div className="basis-1/2">
                <h6 className="text-gray-600 flex items-center gap-3">
                  <TbMoneybag /> Costs
                </h6>
                <div className="flex flex-wrap text-[12px]">
                  <p className="border  rounded-3xl bg-neutral-200 p-2 m-2 text-gray-500 ">
                    {product?.investmentEffort}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  } else {
    return null;
  }
};

export default Product;
