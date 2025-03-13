"use server";

import { FaMoneyBills } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";

import { getSale, getTotalSale } from "../lib/actions";
import { Total } from "./Total";

export async function Sale() {
  
  const responseTotalSale = (await getTotalSale()) || [];
  const responseTodaySale = await getSale() || [];


  function formatAmount(num:number){
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(num);

    return formattedAmount
  }

  const daySale : number  = responseTodaySale?.reduce((sum, item) => sum +=(item?.sale * item.quantity || 0), 0)

  const totalSale : number = responseTotalSale?.reduce((sum , item) => sum +=(item?.sale * item.quantity || 0), 0); 

  if (daySale < 0 || totalSale < 0) return <p className="text-3xl">No Data</p>;

  return (
    <div className="flex items-center gap-4 py-6 text-xl font-bold">
    <Total sale={formatAmount(daySale)} type="Day Sale">
     <SiMoneygram className="text-[3rem] text-[#0369a1]" />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Total Sale">
      <FaMoneyBills className="text-[3rem] text-[#4338ca]" />
    </Total>
    </div>
  );
}
