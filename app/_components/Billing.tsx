"use client";

import axios from "axios";
import { useItem } from "../lib/ItemContext";
import { itemTypes } from "../types";

export function Billing() {
  const { isItem } = useItem();

  const total = isItem
    ?.map((item: itemTypes) => item.price)
    ?.reduce((acc: number, curr: number) => acc + curr, 0);

  async function handler() {
    if (isItem.length === 0 && !total) {
      return;
    }

    try {
      const res = await axios.post("/api/food/pos", {
        items: isItem,
        totalPrice: total,
      });
      return res;
      return;
    } catch (error) {
      console.error("Error Message", error);
      // throw new Error("Please provide a valid types");
    }
  }

  return (
    <div className="flex flex-col font-extrabold">
      <div className="flex justify-between">
        <p>Food</p>
        <p>Quantity</p>
        <p>Price</p>
      </div>
      {isItem?.map((item: itemTypes) => (
        <div key={item.id + Math.random()}>
          <p>{item.name}</p>

          <p>{item.price}</p>
        </div>
      ))}
      <div>
        <p>{total}</p>
      </div>
      <div>
        <button
          onClick={() => handler()}
          className="rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
        >
          print
        </button>
      </div>
    </div>
  );
}
