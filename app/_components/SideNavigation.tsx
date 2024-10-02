"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdStart } from "react-icons/md";
import { GiHotSpices } from "react-icons/gi";

const items = [
  {
    id: 1,
    icon: <MdStart />,
    name: "Starters",
    path: "/",
  },
];

export function SideNavigation() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside className="row-span-full flex h-full flex-col rounded-lg border-4 border-[#f9fafb] bg-[#ffffff] px-8 py-10">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <h2 className="blog text-lg font-bold">Foodie&apos;s Hub</h2>
      </div>

      <ul className="flex flex-col gap-2">
        <li className="rounded-lg px-4 py-2 text-[1.4rem]">
          <Link
            onClick={() => setIsOpen(() => !isOpen)}
            className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] hover:bg-red-600"
            href={"/"}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="block">
                <FaMoneyBillTrendUp />
              </span>
              <span className="block">foods</span>
            </div>
            <IoIosArrowDropdownCircle className="text-lg" />
          </Link>
        </li>
        {isOpen && (
          <>
            <li className="rounded-lg px-4 py-2 text-[1.2rem]">
              <Link
                onClick={() => setIsOpen(() => !isOpen)}
                className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] hover:bg-red-600"
                href={"/"}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="block">
                    <MdStart />
                  </span>
                  <span className="block font-medium">Starters</span>
                </div>
              </Link>
            </li>
            <li className="rounded-lg px-4 py-2 text-[1.2rem]">
              <Link
                onClick={() => setIsOpen(() => !isOpen)}
                className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] hover:bg-red-600"
                href={"/"}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="block">
                    <GiHotSpices />
                  </span>
                  <span className="block font-medium">Main Course</span>
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
