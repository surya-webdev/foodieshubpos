"use server";

import { SiMoneygram } from "react-icons/si";
import { FaMoneyBills } from "react-icons/fa6";
import { BiSolidHide } from "react-icons/bi";

import { getSale, getTotalSale } from "../lib/actions";
import { daySale } from "../types";
import { Total } from "./Total";

export async function Sale() {

  
  const responseTotalSale: daySale[] = (await getTotalSale()) || [];
  const responseTodaySale: daySale[] = await getSale() || [];

  const daySale : number  = responseTodaySale?.reduce((sum, item) => sum +=(item?.sale || 0), 0)

  const totalSale : number = responseTotalSale?.reduce((sum , item) => sum +=(item?.sale || 0), 0); 

  if (daySale < 0 || totalSale < 0) return <p className="text-3xl">No Data</p>;

  return (
    <div className="flex items-center gap-4 py-6 text-xl font-bold">
    <Total sale={daySale} type="Day Sale">
     <SiMoneygram className="text-[3rem] text-[#0369a1]" />
    </Total>
    <Total sale={totalSale} type="Total Sale">
      <FaMoneyBills className="text-[3rem] text-[#4338ca]" />
    </Total>
    </div>
  );
}
