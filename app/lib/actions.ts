"use server";

import { startOfDay, subDays } from "date-fns";

import prisma from "./db";
import { daySale, itemTypes, monthKey } from "../types";
import { format } from "date-fns/fp";

export async function getStarter() {
  try {
    const data = await prisma.starters.findMany();

    if (!data) throw new Error("NO DATA");

    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getMainCourse() {
  try {
    const data = await prisma.maincourse.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

export async function getSoups() {
  try {
    const data = await prisma.soups.findMany();

    if (!data) throw new Error("NO DATA");
    return data;
  } catch (err) {
    console.error("error", err);
  }
}

// get the dashboard details

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];
export async function getSale() {

  try{
    const res = await prisma.dashboard.findMany({
      where: {
        day: new Date(formattedDate),
      },
    });
    return res;
  }catch(err){
    console.error("Error while fetching!" , err);
  }
}

export async function getTotalSale() {
  try{
    const res = await prisma.dashboard.findMany();
    return res;
  }catch(err){
    console.error("Error while fetching!" , err);
  }
}


export async function todaySale(){
  
  const daySale = (await prisma.dashboard.findMany({
    where:{
      day:new Date(formattedDate)
    }
  })||[])

  return daySale;
}

export async function getThirtyDaySales({days = 30}) {

    const promise = Array.from({ length: days }, async (_, i) => {
    const date = startOfDay(subDays(today, i - 1));
   
    const dateString = date.toISOString().split("T")[0];
    const dayData = await prisma?.dashboard.findMany({
      where: {
        day: new Date(dateString),
      },
    });
  
    return dayData;
  }).reverse();

  const getPromise = await Promise.all(promise);
  const result = getPromise.flat();

  const salesByMonth:Record <string, monthKey>   = {};

  result?.forEach((item) =>{
    const salesDate = item.day;
    
    const monthKey = `${salesDate?.getFullYear()}-${String(salesDate?.getMonth() +1 ).padStart(2, '0')}`;
    const monthDisplay = salesDate.toLocaleString("en-Us",{month:"long", year:"numeric"})

    if(!salesByMonth[monthKey]){
     salesByMonth[monthKey] = {
        month: monthDisplay,
        sales: [],
        totalSales: 0,
        sortKey: monthKey 
      };
    }

    salesByMonth[monthKey].sales.push(item);
    salesByMonth[monthKey].totalSales  += item.sale * item.quantity;
    // console.log(salesByMonth)
    
  })

  const monthData = Object.values(salesByMonth).sort((a: { sortKey: string; },b: { sortKey: string; }) => b.sortKey.localeCompare(a.sortKey));

  return monthData;
}




export async function billUpload({soldItem}:{soldItem: itemTypes[] | []}) {

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  
try{

  soldItem.forEach(async (item,index) => {
    const response = await prisma.dashboard.create({
      data:{
        quantity:item.quantity,
        sale: item.price,
        typedish:item.typedish,
        day: new Date(formattedDate),
      }
    }) 
  })
  return { status:true }
  }catch(error){
    console.error("Error",error);
    return {status:false}
  }
}