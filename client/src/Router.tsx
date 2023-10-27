import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImageTiles from "./components/ImageTiles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageTiles />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
