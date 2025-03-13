"use client"

import DaySale from "../_components/DaySale"
import { MonthAnalystics } from "../_components/MonthAnalystics"

export default function Page(){

  return ( 
    <div className="flex flex-col">
    <DaySale/>
    <MonthAnalystics/>
    </div>
  )
}