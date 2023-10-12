import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "./pages/App";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Advertisement from "./pages/Advertisement";
import Profile from "./pages/Profile";
import Wrapper from "./components/Wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/board",
    element: (
      <Wrapper>
        <Board />
      </Wrapper>
    ),
  },
  {
    path: "/board/:id",
    element: (
      <Wrapper>
        <Advertisement />
      </Wrapper>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <Wrapper>
        <Profile />
      </Wrapper>
    ),
  },
  {
    path: "/profile/:id/edit",
    element: (
      <Wrapper>
        <Profile edit />
      </Wrapper>
    ),
  },
]);

const root = createRoot(document.getElementById("root") as Element);

root.render(
  <React.StrictMode>
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);

reportWebVitals();
