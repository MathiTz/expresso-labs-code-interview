"use client"

import { FC } from "react";
import Image from "next/image";
import { useMenu } from "@/app/context/menu";
import { FaBars } from "react-icons/fa";

export const Header: FC = () => {
  const { toggleCollapsed } = useMenu()

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      <button className="md:hidden" onClick={() => toggleCollapsed()}>
        <FaBars className="text-2xl text-black" />
      </button>
      <h1 className="text-2xl text-black">Dashboard</h1>
      <div className="flex items-center">
        <Image
          src="https://avatars.dicebear.com/api/avataaars/john-doe.svg"
          alt="John Doe"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </header>
  )
}
