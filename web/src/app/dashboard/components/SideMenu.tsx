"use client"

import { useMenu } from "@/app/context/menu";
import { ROUTES, RouteType } from "@/app/routes";
import { sanatizeRoute } from "@/app/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const SideMenu: FC = () => {
  const { isCollapsed, toggleCollapsed, isMobileSize } = useMenu()
  const router = useRouter()
  const generateRoute = (route: RouteType, isCollapsed: boolean) => (
    <li
      data-testid={`route${sanatizeRoute(route.path)}`}
      key={route.id}
      className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
      onClick={() => {
        if (isMobileSize) toggleCollapsed()

        router.push(route.path)
      }}
    >
      <route.icon />
      {!isCollapsed && <span className="ml-4">{route.name}</span>}
    </li>
  );

  return (
    <aside
      className={
        clsx(
          'bg-gray-800 h-full min-h-screen transition-all duration-300',
          { 'md:max-w-64 md:block': !isMobileSize && !isCollapsed },
          { 'w-full': isMobileSize && !isCollapsed },
          { 'block': !isMobileSize && isCollapsed },
          { 'hidden': isMobileSize && isCollapsed }
        )
      }
    >
      <div className="flex items-center justify-between h-16 border-b border-gray-900 px-4">
        {!isCollapsed && <h1 className="text-white text-2xl">Expresso Labs</h1>}
        <button className="text-white" onClick={toggleCollapsed}>
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="py-4">
        <ul data-testid="routes-list">
          {ROUTES.map((route) => generateRoute(route, isCollapsed))}
        </ul>
      </nav>
    </aside >
  );
};
