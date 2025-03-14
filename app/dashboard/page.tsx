"use client"

import DaySale from "../_components/DaySale"
import { MonthAnalystics } from "../_components/MonthAnalystics"
import { WeeklySale } from "../_components/WeeklySale"

export default function Page(){

  return ( 
    <div className="flex flex-col gap-10">
    <DaySale/>
    <MonthAnalystics/>
    <WeeklySale/>
    </div>
  )
}