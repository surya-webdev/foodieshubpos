"use server";

import { getSale, getTotalSale } from "../lib/actions";
import { daySale } from "../types";

export async function Sale() {
  const responseTodaySale: Promise<daySale[]> = await getTotalSale();
  const responseTotalSale: Promise<daySale[]> = await getSale();
  return (
    <div className="flex gap-4">
      <div>
        <p>Total sale</p>
        {responseTodaySale
          ?.map((item) => item?.sale)
          .reduce((cur: number, acc: number) => acc + cur, 0)}
      </div>
      <div>
        <p>Today Sale</p>
        {responseTotalSale
          ?.map((item) => item?.sale)
          .reduce((cur: number, acc: number) => acc + cur, 0)}{" "}
      </div>
      <div></div>
    </div>
  );
}
