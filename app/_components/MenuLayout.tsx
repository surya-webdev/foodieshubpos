"use client";

import { itemTypes } from "../types";

// import { useItems } from "../lib/ItemContext";

export function MenuLayout(props: { item: itemTypes }) {
  // type , id
  const { name, price } = props.item;

  // const { addItems } = useItems();
  return (
    <div className="flex flex-col gap-2 rounded-md bg-slate-200 px-4 py-6">
      <div className="flex gap-4 text-xl">
        <p className="capitalize">{name}</p>
        <p className="font-semibold">{price}</p>
      </div>
      <div>
        <button
          // onClick={() => addItems(item)}
          className="rounded-lg bg-red-500 px-6 text-xl font-bold"
        >
          Add
        </button>
      </div>
    </div>
  );
}
