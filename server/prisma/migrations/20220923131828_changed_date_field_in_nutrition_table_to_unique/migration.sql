/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Nutrition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Nutrition_date_key` ON `Nutrition`(`date`);
