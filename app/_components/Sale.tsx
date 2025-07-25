"use client";

import { FaMoneyBills } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import { TbMoneybag } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { getSale, getTotalSale, getWeeklySale } from "../lib/actions";
import { Total } from "./Total";
import { dayResponse, monthKey, topSelling } from "../types";
import { useEffect, useState } from "react";


export function Sale() {

  const [weekSale, setWeekSale] = useState<number>(0); 
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
    const responseTodaySale : dayResponse = (await getSale()) || { daySale: 0, dayItem: [] , dayOrder:0 };
    //@ts-nocheck
    const response = await getWeeklySale()
    
    setTotalSaleData(responseTotalSale);
    setTodaySaleData(responseTodaySale);

    let sale = 0;
    response?.forEach((item) =>  sale = sale + item.totalSales);
    setWeekSale(sale)
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
    <Total sale={formatAmount(weekSale)} type="Weekly Revenue">
     <TbZoomMoneyFilled />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Total Revenue">
      <FaMoneyBills />
    </Total>
    </div>
  );
}
