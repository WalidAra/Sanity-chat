import { authRoutes } from "@/features/auth/routes";
import AppLanding from "@/features/home/page";
import { rootRoutes } from "@/features/root/routes";
import { useRoutes } from "react-router-dom";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <AppLanding />,
    },

    ...authRoutes,
    ...rootRoutes,
  ]);
};

export default Router;
