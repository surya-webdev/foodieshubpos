"use client";

import { FaMoneyBills } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { getSale, getTotalSale } from "../lib/actions";
import { Total } from "./Total";
import { dayResponse, topSelling } from "../types";
import { useEffect, useState } from "react";


export function Sale() {
  
  const [totalSaleData, setTotalSaleData] = useState<{
    totalRevenue: number;
    topSelling: topSelling[];
    totalOrders: number;
  }>({ totalRevenue: 0, topSelling: [], totalOrders: 0 });

  const [todaySaleData, setTodaySaleData] = useState<dayResponse>({
    daySale: 0,
    dayItem: [],
    dayOrder: 0,
  });


  async function handler() {
    const responseTotalSale : {totalRevenue:number ,topSelling:topSelling[] , totalOrders: number }  = (await getTotalSale()) || {totalRevenue:0 ,topSelling:[] , totalOrders : 0};
    const responseTodaySale :dayResponse = (await getSale()) || { daySale: 0, dayItem: [] , dayOrder:0 };

    setTotalSaleData(responseTotalSale);
    setTodaySaleData(responseTodaySale);
  }

  useEffect(()=>{
      handler();
  },[])

  function formatAmount(num:number){
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(num);
    return formattedAmount
  }

  const daySale = (todaySaleData?.daySale) ?? 0
  const dayOrder = (todaySaleData?.dayOrder) ?? 0
  const totalSale : number = totalSaleData?.totalRevenue || 0;
  const totalOrder : number = totalSaleData?.totalOrders || 0;

  if (todaySaleData?.daySale < 0 || totalSale < 0) return <p className="text-3xl">No Data</p>;

  return (
    <div className="grid grid-cols-3 items-center gap-4 py-6 text-xl font-bold">
    <Total sale={formatAmount(daySale)} type="Day Revenue">
     <SiMoneygram  />
    </Total>
    <Total sale={String(dayOrder)} type="Day Order">
     <TbMoneybag />
    </Total>
    <Total sale={String(totalOrder)} type="Total Order">
     <RiMoneyRupeeCircleFill />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Weekly Revenue">
     <TbZoomMoneyFilled />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Total Revenue">
      <FaMoneyBills />
    </Total>
    </div>
  );
}
