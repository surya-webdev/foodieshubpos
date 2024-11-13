"use server";

import { getSale, getTotalSale } from "../lib/actions";
import { daySale } from "../types";
import { SiMoneygram } from "react-icons/si";
import { FaMoneyBills } from "react-icons/fa6";

export async function Sale() {
  // @ts-ignore
  const responseTotalSale: any = await getTotalSale();
  // @ts-ignore
  const responseTodaySale: any = await getSale();

  const daySale = responseTodaySale
    .map((item: daySale) => item?.sale)
    .reduce((cur: number, acc: number) => acc + cur, 0);

  const totalSale = responseTotalSale
    .map((item: daySale) => item?.sale)
    .reduce((cur: number, acc: number) => acc + cur, 0);

  if (daySale < 0 || totalSale < 0) return <p className="text-3xl">No Data</p>;

  return (
    <div className="flex items-center gap-4 py-6 text-xl font-bold">
      <div className="-z-20 flex w-[15rem] items-start justify-between rounded-lg bg-slate-100 p-4">
        <div className="flex items-center justify-center text-[3.8rem] text-[#0369a1]">
          <div className="roun absolute -z-10 h-[4rem] w-[4rem] rounded-xl bg-[#e0f2fe]"></div>
          <SiMoneygram className="text-[3rem] text-[#0369a1]" />
        </div>
        <div className="text-[#374151]">
          <p className="text-2xl">Day sale</p>
          <p>₹{daySale}</p>
        </div>
      </div>
      <div className="-z-20 flex w-[15rem] items-start justify-between rounded-lg bg-slate-100 p-4">
        <div className="flex items-center justify-center text-[3.8rem] text-[#0369a1]">
          <div className="roun absolute -z-10 h-[4rem] w-[4rem] rounded-xl bg-[#e0e7ff]"></div>
          <FaMoneyBills className="text-[3rem] text-[#4338ca]" />
        </div>
        <div>
          <p className="text-2xl">Total sale</p>
          <p>₹{totalSale}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
