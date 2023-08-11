import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configurationActions } from "./redux/configuration-slice";
import { useEffect } from "react";
import { getAppConfig } from "./utils/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>home</div>,
  },
  {
    path: "product",
    element: <div>pruduct page</div>,
  },
  {
    path: "product/edit",
    element: <div>edit</div>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const values: any = useSelector((state) => state);
  const { getConfiguration } = configurationActions;

  useEffect(() => {
    const fetchAppConfig = async () => {
      const response = await getAppConfig();
      if (!values?.configuration.id) {
        dispatch(getConfiguration(response?.data));
      }
    };

    fetchAppConfig();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
