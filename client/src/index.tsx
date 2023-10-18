import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Auth from "./pages/Auth";
import Board from "./pages/Board";
import Advertisement from "./pages/Advertisement";
import Profile from "./pages/Profile";
import Wrapper from "./components/Wrapper";
import AdminList from "./pages/AdminList";
import ApplicationList from "./pages/ApplicationList";
import DynamicForm from "./pages/DynamicFormPage";
import DynamicEditContainer from "./pages/DynamicEditContainer";
import Candidate from "./pages/Candidate";
import Recruiter from "./pages/Recruiter";
import ApplicationDetails from "./pages/ApplicationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Wrapper>
        <Board />
      </Wrapper>
    ),
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
    path: "/:resource",
    element: (
      <Wrapper>
        <AdminList />
      </Wrapper>
    ),
  },
  {
    path: "/:resource/create",
    element: (
      <Wrapper>
        <DynamicForm />
      </Wrapper>
    ),
  },
  {
    path: "/:resource/:id/edit",
    element: (
      <Wrapper>
        <DynamicEditContainer />
      </Wrapper>
    ),
  },
  {
    path: "/applications/me",
    element: (
      <Wrapper>
        <ApplicationList />
      </Wrapper>
    ),
  },
  {
    path: "/applications/me/:id",
    element: (
      <Wrapper>
        <ApplicationDetails />
      </Wrapper>
    ),
  },
  {
    path: "/candidate",
    element: (
      <Wrapper>
        <Candidate />
      </Wrapper>
    ),
  },
  {
    path: "/advertisements/me",
    element: (
      <Wrapper>
        <Recruiter />
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
