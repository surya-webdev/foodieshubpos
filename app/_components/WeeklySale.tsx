"use client"

import { useEffect, useState } from "react";
import { IoIosRocket } from "react-icons/io";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { Loader } from "../_components/Loader";
import { getWeeklySale } from "../lib/actions";
import { monthKey } from "../types";



export function WeeklySale(){
  
// const {isData , addItem}= useSale()
const [isData , setIsData] = useState<monthKey[]>([])
const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handler() {
    try {
      setIsLoading(true);
    
      const response = await getWeeklySale();
      // @ts-ignore
      setIsData(()=> response)

    } catch (error) {
      console.error(error);
      setIsLoading(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handler();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if(isData?.length == 0 || !isData ) return <div className="w-full h-full flex justify-center items-center font-bold text-2xl my-5">Sale is not started yet!!</div>

  return (
    <>
  
        <div >
        </div>
        <div className="w-full">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl my-5">
            <p>Weekly Sales</p>
            <p><IoIosRocket/></p>
            </div>
           
          <ComposedChart width={1000} height={500} data={isData}>
           <XAxis dataKey="month" />
           <YAxis dataKey='totalSales' />
           <Tooltip />
           <Legend />
           <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" name="Dish" dataKey="typedish" fill="#8884d8" stroke="#8884d8" />
            <Area type="monotone" name="Quantity" dataKey="quantity" fill="#000000" stroke="#000000" />
            <Bar  name="Sales" dataKey="totalSales" barSize={20} fill="#413ea0" />
           <Line type="monotone" name="Sales" dataKey="sale" stroke="#ff7300" />
          </ComposedChart>
        </div>
  
    </>)
}

