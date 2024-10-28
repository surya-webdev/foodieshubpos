"use client";

import { useItem } from "../lib/ItemContext";
import { itemTypes } from "../types";

export function MenuLayout(props: { item: itemTypes }) {
  // type , id
  const { addItem } = useItem();
  const { name, price } = props.item;

  return (
    <div className="flex flex-col justify-between gap-2 rounded-md bg-slate-200 px-4 py-2">
      <div className="text-md flex justify-between gap-4">
        <div>
          <p className="capitalize">{name}</p>
        </div>
        <div>
          <p className="font-semibold">{price}</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => addItem(props.item)}
          className="text-md rounded-lg bg-[#d6651f] px-6 font-bold text-black"
        >
          Add
        </button>
      </div>
    </div>
  );
}
