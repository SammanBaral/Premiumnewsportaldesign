import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ArticlePage } from "./pages/ArticlePage";
import { GamesPage } from "./pages/GamesPage";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/article/:id",
    Component: ArticlePage,
  },
  {
    path: "/games",
    Component: GamesPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
]);
