"use server";



export const revalidate = 0;

import { startOfDay, subDays } from "date-fns";

import prisma from "./db";
import { daySale, itemTypes } from "../types";

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

export async function getSale() {

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
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

export async function getThirtyDaySales() {
  //
  const today = new Date();
  const promise = Array.from({ length: 30 }, async (_, i) => {
    const date = startOfDay(subDays(today, i));
    const dateString = date.toISOString().split("T")[0];
    const dayData = await prisma?.dashboard.findMany({
      where: {
        day: new Date(dateString),
      },
    });

    if (!dayData) {
      return;
    } else {
      return dayData;
    }
  
  }).reverse();

  const getPromise = await Promise.all(promise);
  const result = getPromise.flat();
  return result;
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