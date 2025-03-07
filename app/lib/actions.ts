"use server";

import { startOfDay, subDays } from "date-fns";

import prisma from "./db";

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

  const res = await prisma.dashboard.findMany({
    where: {
      // create
      day: new Date(formattedDate),
    },
  });

  return res;
}

export async function getTotalSale() {
  const res = await prisma.dashboard.findMany();

  return res;
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
    } else {
      return dayData;
    }
  }).reverse();

  const getPromise = await Promise.all(promise);

  const result = getPromise.flat();

  return result;
}
