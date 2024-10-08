"use client";

import axios from "axios";
import { useItems } from "../lib/ItemContext";
import { itemTypes } from "../types";

export function Billing() {
  const { selectItem } = useItems();

  async function handler() {
    if (!selectItem || !total) return;

    try {
      const res = await axios.post("/api/food/pos", {
        items: selectItem,
        totalPrice: total,
      });

      if (res) {
        return localStorage.setItem("menu", "");
      } else {
        return "error";
      }
    } catch (error) {
      console.error(error);
    }
  }
  const total = selectItem
    ?.map((item: itemTypes) => item.price)
    ?.reduce((acc: number, curr: number) => acc + curr, 0);
  return (
    <>
      {selectItem?.map((item: itemTypes) => (
        <div key={item.id + Math.random(5)}>
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      ))}

      <p>{total}</p>

      <button className="bg-white p-6" onClick={handler}>
        print
      </button>
    </>
  );
}
