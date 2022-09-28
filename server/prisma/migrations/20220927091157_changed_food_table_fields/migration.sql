/*
  Warnings:

  - You are about to drop the column `quantity` on the `Food` table. All the data in the column will be lost.
  - Added the required column `numOfServings` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servingSize` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Food` DROP COLUMN `quantity`,
    ADD COLUMN `numOfServings` VARCHAR(191) NOT NULL,
    ADD COLUMN `servingSize` VARCHAR(191) NOT NULL;
