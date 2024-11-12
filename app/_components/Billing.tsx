"use client";

import { GiEmptyHourglass } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";

import axios from "axios";
import { useItem } from "../lib/ItemContext";
import { itemTypes } from "../types";

export function Billing() {
  const { isItem, removeItem, resetItem } = useItem();

  function reset() {
    resetItem();
  }

  const total = isItem
    ?.map((item: itemTypes) => item.price * (item.quantity ? item.quantity : 1))
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

      if (res.data.message === "success") {
        return reset();
      }
    } catch (error) {
      console.error("Error Message", error);
    }
  }

  async function handler2() {
    if (isItem.length === 0) {
      return;
    }

    try {
      const res = await axios.post("/api/food/kitchen", {
        items: isItem,
      });
      return res;
    } catch (error) {
      console.error("Error Message", error);
    }
  }

  if (isItem.length <= 0 || !isItem) {
    return (
      <div className="flex items-center justify-center text-xl">
        <p className="py-2 text-red-600">
          <GiEmptyHourglass />
        </p>
        <p>No item here!</p>
      </div>
    );
  }

  if (isItem.length > 0) {
    return (
      <div className="flex flex-col justify-between bg-slate-50 px-4 py-6 font-bold">
        <div>
          <div className="flex justify-between py-4 text-2xl text-[#d6651f]">
            <p>Food</p>
            <p className="translate-x-8">Quantity</p>
            <p>Price</p>
            <div></div>
          </div>

          {isItem?.map((item: itemTypes) => (
            <>
              <div
                className="flex items-center justify-between py-4"
                key={item.id + Math.random() * 1000}
              >
                <div className="inline-block w-[11.5rem]">
                  <p>{item.name}</p>
                </div>
                <div className="w-[5rem]">{item.quantity ?? 1}</div>
                <div className="inline-block">
                  <p>{item.price * (item.quantity > 1 ? item.quantity : 1)}</p>
                </div>
                <div className="self-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xl text-red-600"
                  >
                    <TiDelete />
                  </button>
                </div>
              </div>
              <hr />
            </>
          ))}
          <div className="my-10">
            <hr />
            {total > 0 && (
              <div className="flex justify-between py-8">
                <p className="inline-block">Total:</p>
                <p className="inline-block">{`₹ ${total}`}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end py-2">
            <button onClick={() => reset()} className="underline">
              Clear All
            </button>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <button
              disabled={!isItem.length}
              onClick={() => handler()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Print
            </button>
            <p>(or)</p>
            <button
              disabled={!isItem.length}
              onClick={() => handler2()}
              className="w-full rounded-lg bg-[#d6651f] px-8 text-lg font-bold text-black"
            >
              Kitchen Order
            </button>
          </div>
        </div>

        <div className=""></div>
        <div></div>
      </div>
    );
  }
}
