"use client"

import { ROUTES, RouteType } from "@/app/routes";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export const SideMenu: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter()
  const generateRoute = (route: RouteType) => {
    return (
      <li key={route.id} className="flex items-center px-6 py-2 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer" onClick={
        () => router.push(route.path)}>
        <route.icon />
        {!isCollapsed && <span className="ml-4">{route.name}</span>}
      </li>
    )
  }

  return (
    <aside className={`bg-gray-800 ${isCollapsed ? "w-20" : "w-full"} h-full min-h-screen transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 border-b border-gray-900 px-4">
        {!isCollapsed && <h1 className="text-white text-2xl">Expresso Labs</h1>}
        <button
          className="text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <nav className="py-4">
        <ul>
          {ROUTES.map(route => (
            generateRoute(route)
          ))}
        </ul>
      </nav>
    </aside>
  );
};
