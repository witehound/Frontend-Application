import { ReactNode } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }: LayoutProp) => {
  const product: any = useSelector((state) => state?.product);
  const configuration: any = useSelector((state) => state?.configuration);

  return (
    <main className=" w-full min-h-screen">
      <header
        className={` w-full p-4 flex`}
        style={{ backgroundColor: configuration.mainColor }}
      >
        <div className="w-40 flex items-center justify-center">
          <img src={configuration.logo} className="h-6 " />
        </div>
        <div className="flex items-center justify-between flex-1">
          <div className="invisible lg:visible">
            <input
              placeholder="Enter interests, keywords, company name"
              className="rounded-sm lg:min-w-[500px] px-2 h-6 outline-none text-black placeholder:text-sm"
            />
          </div>
          <div
            className={`pr-4 invisible md:visible ${
              !configuration.hasUserSection && "md:invisible"
            }`}
          >
            <img
              src={product.id && product?.user?.profilePicture}
              className="rounded-full w-8"
            />
          </div>
        </div>
      </header>
      <div className="w-screen p-3 flex ">
        {configuration.hasUserSection && product.id ? (
          <section className="flex-[0.9] hidden lg:block">
            <div className=" flex items-center">
              <div className=" flex items-center justify-center p-2">
                <img
                  src={product?.user?.profilePicture}
                  className="rounded-full w-12"
                />
              </div>

              <div>
                <h3 className="text-xl">{product?.user?.firstName}</h3>
                <p className="text-sm">{product.company.name}</p>
              </div>
            </div>
            <div className="p-4 m-4">
              <p>Home</p>
              <p className="pt-2">Members</p>
              <p className="pt-2">Organisation</p>
            </div>
          </section>
        ) : null}

        <div className="lg:flex-[4] w-full">{children}</div>
      </div>
    </main>
  );
};
export default Layout;

type LayoutProp = {
  children: ReactNode;
};
