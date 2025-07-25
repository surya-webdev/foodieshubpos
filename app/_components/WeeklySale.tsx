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

  console.dir(isData)
  if(isData?.length == 0 || !isData ) return <div className="w-full h-full flex justify-center items-center font-bold text-2xl my-5 bg-white p-5 rounded-md shadow-md">Sale is not started yet!!</div>

  return (
    <>
  
        <div >
        </div>
        <div className="w-full bg-white p-5 rounded-md shadow-md">
          <div className="flex justify-center items-center gap-2 font-bold text-2xl my-5">
            <p>Weekly Sales</p>
            <p><IoIosRocket/></p>
            </div>
           
          <ComposedChart  width={1400} height={500} data={isData}>
           <XAxis dataKey="month" />
           <YAxis dataKey='totalSales' />
           <Tooltip />
           <Legend />
           <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" name="Dish" dataKey="typedish" fill="#8884d8" stroke="#8884d8" />
            <Area type="monotone" name="Quantity" dataKey="quantity" fill="#000000" stroke="#000000" />
            <Bar  name="Sales" dataKey="totalSales"  barSize={40} fill="#ff6600" />
           <Line type="monotone" name="Sales" dataKey="sale" stroke="#ff7300" />
          </ComposedChart>
        </div>
  
    </>)
}

