/*
  Warnings:

  - Made the column `day` on table `dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sale` on table `dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typedish` on table `dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `dashboard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "dashboard" ALTER COLUMN "day" SET NOT NULL,
ALTER COLUMN "sale" SET NOT NULL,
ALTER COLUMN "typedish" SET NOT NULL,
ALTER COLUMN "typedish" SET DEFAULT '',
ALTER COLUMN "quantity" SET NOT NULL;
