/*
  Warnings:

  - You are about to alter the column `distance` on the `CardioSet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `CardioSet` MODIFY `caloriesBurned` INTEGER NULL,
    MODIFY `distance` DOUBLE NULL;
