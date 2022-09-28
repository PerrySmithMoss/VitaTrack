/*
  Warnings:

  - Made the column `calories` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbohydrate` on table `Food` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sugar` on table `Food` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Food` MODIFY `calories` INTEGER NOT NULL,
    MODIFY `protein` DOUBLE NOT NULL,
    MODIFY `fat` DOUBLE NOT NULL,
    MODIFY `carbohydrate` DOUBLE NOT NULL,
    MODIFY `sugar` DOUBLE NOT NULL;
