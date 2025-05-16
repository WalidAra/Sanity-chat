import { Outlet, RouteObject } from "react-router-dom";
import RootLayout from "./components/templates/root-layout";
import Search from "./pages/search";
import Chat from "./pages/chat";

export const rootRoutes: RouteObject[] = [
  {
    path: "/home",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Search />,
      },

      {
        path: "chat",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: ":id",
            element: <Chat />,
          },
        ],
      },
    ],
  },
];
