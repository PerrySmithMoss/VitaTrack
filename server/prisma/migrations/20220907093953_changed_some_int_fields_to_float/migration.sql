/*
  Warnings:

  - You are about to alter the column `caloriesBurned` on the `CardioSet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `weight` on the `StrengthSet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `bodyweight` on the `Workout` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `CardioSet` MODIFY `caloriesBurned` DOUBLE NULL;

-- AlterTable
ALTER TABLE `StrengthSet` MODIFY `weight` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Workout` MODIFY `bodyweight` DOUBLE NULL;
