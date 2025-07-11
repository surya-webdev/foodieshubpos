"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";

import { FaUserAlt } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiHotSpices } from "react-icons/gi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { MdAnalytics, MdStart } from "react-icons/md";
import { GiChickenLeg } from "react-icons/gi";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { GiSlicedBread } from "react-icons/gi";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSoupFilled } from "react-icons/tb";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaFreeCodeCamp } from "react-icons/fa";
import { logout } from "../lib/actions";

const navList = [
  {id:12, icon:<FaFreeCodeCamp />, name:"Frequent" , link:"/food/frequent"},
  {id:0, icon:<MdOutlineFreeBreakfast />, name:"Tiffin" , link:"/food/tiffin"},
  {id:1, icon:<TbSoupFilled/>, name:"Soup" , link:"/food/soups"},
  {id:2, icon:<MdStart/>, name:"Starter" , link:"/food/starters"},
  {id:3, icon:<GiHotSpices/>, name:"Rice & Noodles" , link:"/food/main"},
  {id:4, icon:<TbBowlSpoonFilled />, name:"Gravy" , link:"/food/gravy"},
  {id:5, icon:<GiChickenOven />, name:"Biriyani" , link:"/food/biriyani"},
  {id:6, icon:<GiSlicedBread />, name:"Breads" , link:"/food/breads"},
  {id:7, icon:<GiChickenLeg />, name:"BBQ" , link:"/food/bbq"},
  {id:9, icon:<BsLightningChargeFill />, name:"Add-On" , link:"/food/addon"},
  {id:10, icon:<MdAnalytics/>, name:"Dashboard" , link:"/dashboard"},
  {id:11, icon:<FaUserAlt/>, name:"User" , link:"/"},
];


export function SideNavigation() {
  
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname()
  const  [isLoading , setIsLoading] = useState<boolean>(false);

 async function handler(){
  setIsLoading(false);
  try{
    const response = await logout();
    if(response){
      router.push("/signin")
    }
  }catch(error){
  console.error(error);

  }finally{
   setIsLoading(false);
  }

}

  return (
    <aside className="fixed flex h-full w-[16rem] flex-col rounded-lg border border-[#dcdcdc] text-black bg-[#ffffff] px-2 overflow-y-scroll ">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" width={80} height={80} alt="logo" />
        <Link href="/" className="blog text-[#de432f] text-[1rem] font-bold">
        Murugan Hotel
       </Link>
      </div>

      <ul className="flex flex-col h-full gap-2 transition-all duration-75 ease-in-out">
        {/*  */}
        <li className="rounded-lg px-4 py-2 text-[1.2rem] font-medium">
          <Link
            onClick={() => setIsOpen(() => !isOpen)}
            className={` ${pathname === '/' ? 'bg-sec' : ''} flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] hover:bg-sec`}
            href={"/"}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="block">
                <FaMoneyBillTrendUp />
              </span>
              <span className="block">Foods</span>
            </div>
            <IoIosArrowDropdownCircle className="text-lg" />
          </Link>
        </li>
        <>
        {navList.map((item) => {
          return <li className="rounded-lg px-4 py-2 text-[1.2rem]">
            <Link
              onClick={() => setIsOpen(() => !isOpen)}
              className={` ${pathname === item.link ? "bg-sec" : ""} flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-[#000000] transition-all duration-500`}
              href={item.link}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="block">
                  {item.icon}
                </span>
                <span className="block font-medium">{item.name}</span>
              </div>
            </Link>
          </li>
        })}
        </>
      </ul>

        <div className="w-full rounded-lg px-4 py-2 text-[1.2rem] justify-self-end self-center hover:bg-sec duration-75 ease-in-out transition-all">
            <button
             disabled={isLoading}
              onClick={()=>handler()}
              className="flex items-center justify-between gap-4 rounded-lg px-2 py-1 text-red-500 transition-all"
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
