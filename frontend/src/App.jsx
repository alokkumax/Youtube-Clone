import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";
import UploadVideo from "./pages/UploadVideo";
import NotFound from "./pages/NotFound";

// Setup all routes for the app
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/video/:id",
        element: <VideoPlayer />,
      },
      {
        path: "/channel/:id",
        element: <Channel />,
      },
      {
        path: "/create-channel",
        element: <CreateChannel />,
      },
      {
        path: "/upload-video/:channelId",
        element: <UploadVideo />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
