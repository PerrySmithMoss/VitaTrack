/*
  Warnings:

  - Added the required column `mealName` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Food` ADD COLUMN `mealName` VARCHAR(191) NOT NULL;
