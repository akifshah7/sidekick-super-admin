// data.ts
import dashboardIcon from "@/assets/home.svg";
import creditsIcon from "@/assets/credits.svg";
import usersIcon from "@/assets/user.svg";

export const links = [
  {
    title: "Dashboard",
    route: "/",
    icon: dashboardIcon,
  },
  {
    title: "Institutions",
    route: "/institutions",
    icon: usersIcon,
  },
  {
    title: "Revenue",
    route: "/revenue",
    icon: creditsIcon,
  },
];
