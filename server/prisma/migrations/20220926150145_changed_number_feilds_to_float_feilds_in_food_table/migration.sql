/*
  Warnings:

  - Made the column `quantity` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Food` MODIFY `quantity` DOUBLE NOT NULL;
