import dashboardIcon from "@/assets/home.svg";
import creditsIcon from "@/assets/credits.svg";
import usersIcon from "@/assets/user.svg";
import logoutIcon from "@/assets/logout.svg";

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
  {
    title: "Log Out",
    route: "/",
    icon: logoutIcon,
  }
];
