"use client";

import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { itemTypes } from "../types";

const ItemContext = createContext();

export function ItemProvide({ children }: { children: React.ReactNode }) {
  // //
  const [selectItem, setSelectItem] = useState(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem("menu");
      return data ? JSON.parse(data) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(selectItem));
  }, [selectItem]);
  // localStorage.setItem("menu", JSON.stringify(selectItem));
  // console.log(data);

  const addItems = (item: itemTypes) => setSelectItem([...selectItem, item]);

  return (
    <ItemContext.Provider value={{ addItems, selectItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItems = () => useContext(ItemContext);
