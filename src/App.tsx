import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

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
  return <RouterProvider router={router} />;
}

export default App;
