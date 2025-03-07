"use client";

import { useState } from "react";
import { itemTypes } from "../types";
import { useItem } from "../lib/ItemContexts";

export function MenuLayout(props: { item: itemTypes }) {
  const [isQuantity, setIsQuantity] = useState(1);
  // type , id
  const { addItem } = useItem();
  const { name, price } = props.item;

  return (
    <div className="flex h-[8rem] flex-col justify-between gap-2 rounded-md bg-slate-200 px-2 py-6">
      <div className="text-md flex justify-between gap-4">
        <div>
          <p className="capitalize">{name}</p>
        </div>
        <div>
          <p className="font-semibold">{price}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            addItem({
              ...props.item,
              quantity: isQuantity,
              id: `${props.item.id}${Math.random() * 3000}`,
            })
            setIsQuantity(1)
          }
          }
          className="text-md rounded-lg bg-[#d6651f] px-6 font-bold text-black"
        >
          Add
        </button>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setIsQuantity(isQuantity <= 1 ? 1 : isQuantity - 1)}
            className="h-[2rem] w-[2rem] rounded-full bg-slate-200 font-normal text-black"
          >
            -
          </button>
          <p className="inline-block">{isQuantity}</p>

          <button
            onClick={() => setIsQuantity(isQuantity + 1)}
            className="h-[2rem] w-[2rem] rounded-full bg-slate-200 px-1 text-sm font-normal text-black"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
