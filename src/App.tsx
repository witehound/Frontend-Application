import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configurationActions } from "./redux/configuration-slice";
import { useEffect } from "react";
import { getAppConfig } from "./utils/api";
import Product from "./pages/Product";
import EditProduct from "./pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  {
    path: "product",
    element: <Product />,
  },
  {
    path: "product/edit",
    element: <EditProduct />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const values: any = useSelector((state) => state);
  const { addConfiguration } = configurationActions;

  useEffect(() => {
    const fetchAppConfig = async () => {
      if (values?.configuration.id) return;
      const response = await getAppConfig();

      dispatch(addConfiguration(response?.data));
    };

    fetchAppConfig();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
