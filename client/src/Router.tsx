import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImageTiles from "./components/ImageTiles";
import Image from "./components/Image";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageTiles />,
  },
  {
    path: "/images/:id",
    element: <Image />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
