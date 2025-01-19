"use client"

import { FC, PropsWithChildren, useContext, useState, createContext } from "react";
import { sleep } from "@/app/utils";
import { MenuContextType } from "./menu.types";

const MenuContext = createContext({} as MenuContextType)

const MenuContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = async () => {
    setIsCollapsed(!isCollapsed);
    console.log('AQUI')
    await sleep(300);
  }

  const isMobileSize = window.innerWidth < 768

  return (
    <MenuContext.Provider value={
      {
        isCollapsed,
        toggleCollapsed,
        isMobileSize
      }
    }>
      {children}
    </MenuContext.Provider>
  )
}

const useMenu = (): MenuContextType => useContext(MenuContext)

export { MenuContextProvider, useMenu }
