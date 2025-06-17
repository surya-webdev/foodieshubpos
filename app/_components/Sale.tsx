"use server";

import { FaMoneyBills } from "react-icons/fa6";
import { SiMoneygram } from "react-icons/si";
import { getSale, getTotalSale } from "../lib/actions";
import { Total } from "./Total";
import { dayResponse, topSelling } from "../types";



export async function Sale() {
  
  const responseTotalSale : {totalRevenue:number ,topSelling:topSelling[] , totalOrders: number }  = (await getTotalSale()) || {totalRevenue:0 ,topSelling:[] , totalOrders : 0};
  const responseTodaySale :dayResponse = (await getSale()) || { daySale: 0, dayItem: [] , dayOrder:0 };

  function formatAmount(num:number){
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(num);
    return formattedAmount
  }

  const daySale = (responseTodaySale?.daySale) ?? 0
  const dayOrder = (responseTodaySale?.dayOrder) ?? 0
  const totalSale : number = responseTotalSale?.totalRevenue || 0;
  const totalOrder : number = responseTotalSale?.totalOrders || 0;

  if (responseTodaySale?.daySale < 0 || totalSale < 0) return <p className="text-3xl">No Data</p>;

  return (
    <div className="grid grid-cols-3 items-center gap-4 py-6 text-xl font-bold">
    <Total sale={formatAmount(daySale)} type="Day Revenue">
     <SiMoneygram className="text-[3rem] text-[#0369a1]" />
    </Total>
    <Total sale={String(dayOrder)} type="Day Order">
     <SiMoneygram className="text-[3rem] text-[#0369a1]" />
    </Total>
    <Total sale={String(totalOrder)} type="Total Order">
     <SiMoneygram className="text-[3rem] text-[#0369a1]" />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Weekly Revenue">
      <FaMoneyBills className="text-[3rem] text-[#4338ca]" />
    </Total>
    <Total sale={formatAmount(totalSale)} type="Total Revenue">
      <FaMoneyBills className="text-[3rem] text-[#4338ca]" />
    </Total>
    </div>
  );
}
