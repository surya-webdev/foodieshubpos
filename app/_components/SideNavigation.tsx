"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdStart } from "react-icons/md";
import { GiHotSpices } from "react-icons/gi";
import { TbSoupFilled } from "react-icons/tb";
import { MdAnalytics } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { logout } from "../lib/actions";

export function SideNavigation() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="fixed flex h-screen w-[16rem] flex-col rounded-lg border border-[#dcdcdc] bg-[#ffffff] px-2 py-10">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <Link href="/" className="blog text-lg font-bold">
          Foodie&apos;s Hub
        </Link>
      </div>

      <ul className="flex flex-col h-full gap-2">
        {/*  */}
        <li className="rounded-lg px-4 py-2 text-[1.4rem]">
          <Link
            onClick={() => setIsOpen(() => !isOpen)}
            className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] hover:bg-slate-300"
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

        <li className="rounded-lg px-4 py-2 text-[1.2rem]">
          <Link
            onClick={() => setIsOpen(() => !isOpen)}
            className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all hover:bg-slate-300"
            href={"/food/soups"}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="block">
                <TbSoupFilled />
              </span>
              <span className="block font-medium">Soups</span>
            </div>
          </Link>
        </li>

        <>
          <li className="rounded-lg px-4 py-2 text-[1.2rem]">
            <Link
              onClick={() => setIsOpen(() => !isOpen)}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all duration-500 hover:bg-slate-300"
              href={"/food/starters"}
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
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all hover:bg-slate-300"
              href={"/food/main"}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="block">
                  <GiHotSpices />
                </span>
                <span className="block font-medium">Main Course</span>
              </div>
            </Link>
          </li>
          <li className="rounded-lg px-4 py-2 text-[1.2rem]">
            <Link
              onClick={() => setIsOpen(() => !isOpen)}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all hover:bg-slate-300"
              href={"/dashboard"}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="block">
                  <MdAnalytics />
                </span>
                <span className="block font-medium">Dashboard</span>
              </div>
            </Link>
          </li>
           <li className="rounded-lg px-4 py-2 text-[1.2rem] justify-between">
            <Link
              onClick={() => setIsOpen(() => !isOpen)}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all hover:bg-slate-300"
              href={"/dashboard"}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="block">
                  <FaUserAlt />
                </span>
                <span className="block font-medium">User</span>
              </div>
            </Link>
          </li>
          
        </>
      </ul>

      <div className="w-full rounded-lg px-4 py-2 text-[1.2rem] justify-self-end self-center">
            <button
              onClick={()=>logout()}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-red-500 transition-all hover:bg-slate-300"
            >
              <div className="flex items-center justify-center text-red-500 gap-2">
                <span className="block">
                  <LuLogOut />
                </span>
                <span className="block text-red-500  font-medium">LogOut</span>
              </div>
            </button>
          </div>
    </aside>
  );
}
