"use client"

import { createContext, useContext, useState } from "react"
import { monthKey } from "../types";



type itemTypes = {
  saleData:monthKey[]|[],
  addItem:(item:monthKey)=> void;
}

const defaultContext = {
saleData:[],
addItem:()=>{}
}

const context = createContext<itemTypes>(defaultContext);

export function SaleContext({children}:{children:React.ReactNode}){

  const [saleData , setSaleData] = useState<monthKey[]>([]);
console.log(saleData)
  function addItem(item:monthKey){
    if(!item) return;
    setSaleData((prevItem) => [...prevItem ,item]);
  }

  return <context.Provider value={{saleData, addItem}}>{children}</context.Provider>
}


export function useSale(){

  const contexts = useContext(context);
  if(contexts === undefined){
     throw new Error("Context use in outside of the provider");
  }

  return contexts
}