"use client";

import { useItem } from "@/app/lib/ItemContexts";
import { itemTypes } from "@/app/types";
import { useState } from "react";

const data = [
  {
    id:1,
    name: 'Add On',
    quantity:1,
    price:5,
    type: 'extra charges',
    typedish: 'extra charges'
  },
  {
    id:2,
    name: 'Parcel',
    quantity:1,
    price:5,
    type: 'extra charges',
    typedish: 'extra charges'
  },
  {
    id:3,
    name: 'Egg',
    quantity:1,
    price:10,
    type: 'extra charges',
    typedish: 'extra charges'
  },
  {
    id:3,
    name: 'Extra Parotta',
    quantity:1,
    price:20,
    type: 'extra charges',
    typedish: 'extra charges'
  }
]

function MenuLayout(props: { item: itemTypes }) {

  const [isQuantity, setIsQuantity] = useState(5);
  const { addItem } = useItem();
  const { name, price } = props.item;

  return (
    <div className="flex h-[8rem] flex-col justify-between gap-2 rounded-md bg-slate-200 px-2 py-6">
      <div className="text-md flex justify-between gap-4">
        <div>
          <p className="capitalize">{name}</p>
        </div>
        <div>
          <p className="font-semibold">{isQuantity}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            addItem({
              ...props.item,
              price: isQuantity,
              id: `${props.item.id}${Math.random() * 3000}`,
            })
            setIsQuantity(5)
          }
          }
          className="text-md rounded-lg bg-primary px-6 font-bold text-black"
        >
          Add
        </button>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setIsQuantity(isQuantity <= 5 ? 5 : isQuantity - 5)}
            className="h-[2rem] w-[2rem] rounded-full hover:bg-white bg-slate-100 transition-all  px-1 text-sm font-normal text-black"
          >
            -
          </button>
          <p className="inline-block transition-all">{isQuantity}</p>

          <button
            onClick={() => setIsQuantity(isQuantity + 5)}
            className="h-[2rem] w-[2rem] rounded-full hover:bg-white bg-slate-100 transition-all  px-1 text-sm font-normal text-black"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default async function Page(){
  return  <>
  <aside className="px-4 py-2">
        <div className="flex flex-col py-8">
          <div className="my-2 text-xl font-bold">
            <p>Add On Charges</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {data?.map((item: any) => (
              <MenuLayout item={item} key={item.id} />
            ))}
          </div>
        </div>
      </aside>
  </>
}
