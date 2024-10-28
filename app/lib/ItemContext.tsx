"use client";

import React, { createContext, useContext, useState } from "react";

import { itemTypes } from "../types";

interface itemDefault {
  isItem: itemTypes[];
  addItem: (item: itemTypes) => void;
}

const defaultContextValue: itemDefault = {
  isItem: [],
  addItem: () => {},
};

const itemContext = createContext<itemDefault>(defaultContextValue);

export function ItemProvide({ children }: { children: React.ReactNode }) {
  const [isItem, setIsItem] = useState<itemTypes[]>([]);

  function addItem(item: itemTypes) {
    if (!item) return;

    setIsItem((prevItem) => [...prevItem, item]);
  }

  return (
    <itemContext.Provider value={{ isItem, addItem }}>
      {children}
    </itemContext.Provider>
  );
}

export const useItem = () => {
  const context = useContext(itemContext);

  if (context === undefined)
    throw new Error("Context use in outside of the provider");

  return context;
};
