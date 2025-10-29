import type { ComponentType, JSX } from "react";
import { MapPin, User } from "lucide-react";

import { ProfilePage } from "@/pages/ProfilePage";
import { ExplorePage } from "@/pages/ExplorePage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  {
    path: "/",
    Component: ExplorePage,
    title: "Explore",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    path: "/profile",
    Component: ProfilePage,
    title: "Profile",
    icon: <User className="w-6 h-6" />,
  },
];
