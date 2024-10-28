"use server";

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
