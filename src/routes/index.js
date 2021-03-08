import { paths } from "./paths";
import MainPage from "pages/Main";
import UserPage from "pages/User";

export const routes = [
  {
    Component: MainPage,
    path: paths.main,
    exact: true,
  },
  {
    Component: UserPage,
    path: paths.user,
    exact: false,
  },
];
