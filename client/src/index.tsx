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
import AdminList from "./pages/AdminList";
import AdminForm from "./pages/AdminForm";
import AdminEditContainer from "./pages/AdminEditContainer";
import ApplicationList from "./pages/ApplicationList";
import Message from "./pages/Message";

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
  {
    path: "/admin/:resource",
    element: (
      <Wrapper>
        <AdminList />
      </Wrapper>
    ),
  },
  {
    path: "/admin/:resource/create",
    element: (
      <Wrapper>
        <AdminForm />
      </Wrapper>
    ),
  },
  {
    path: "/admin/:resource/:id/edit",
    element: (
      <Wrapper>
        <AdminEditContainer />
      </Wrapper>
    ),
  },
  {
    path: "/Application",
    element: (
      <Wrapper>
        <ApplicationList />
      </Wrapper>
    ),
  },
  {
    path: "/Application/:id",
    element: (
      <Wrapper>
        <Message />
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
