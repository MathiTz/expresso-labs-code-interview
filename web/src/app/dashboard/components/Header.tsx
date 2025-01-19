import { FC } from "react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      <h1 className="text-2xl">Dashboard</h1>
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
