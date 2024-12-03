import { createBrowserRouter, Navigate } from "react-router-dom";
import { path } from "./CommonPaths";
import LogIn from "../pages/Auth";
import { getToken } from "../utils/helpers/cookies.helpers";
import { ReactNode } from "react";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/Auth/Signup";
import ViewFilms from "../pages/Films";
import ViewCharacter from "../pages/Films/viewCharacter";
import Default from "../layouts/Defaultlayout";
import AddFilm from "../pages/Films/AddFilm";

interface WrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: WrapperProps) => {
  return getToken() ? <Navigate to={path.dashboard} replace /> : children;
};

export const ProtectedComponentWrapper = ({ children }: WrapperProps) => {
  return getToken() ? children : <Navigate to={path.login} replace />;
};

export const router = createBrowserRouter([
  {
    path: path.login,
    element: <AuthWrapper children={<LogIn />} />,
  },
  {
    path: path.signup,
    element: <AuthWrapper children={<SignUp />} />,
  },
  {
    path: path.dashboard,
    element: (
      <ProtectedComponentWrapper
        children={<Default children={<Dashboard />} />}
      />
    ),
  },
  {
    path: path.viewFilm,
    element: (
      <ProtectedComponentWrapper
        children={<Default children={<ViewFilms />} />}
      />
    ),
  },
  {
    path: path.viewCharacter,
    element: (
      <ProtectedComponentWrapper
        children={<Default children={<ViewCharacter />} />}
      />
    ),
  },
  {
    path: path.addFilms,
    element: (
      <ProtectedComponentWrapper
        children={<Default children={<AddFilm />} />}
      />
    ),
  },
]);
