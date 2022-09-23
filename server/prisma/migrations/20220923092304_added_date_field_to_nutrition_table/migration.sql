/*
  Warnings:

  - Added the required column `date` to the `Nutrition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Nutrition` ADD COLUMN `date` DATETIME(3) NOT NULL;
