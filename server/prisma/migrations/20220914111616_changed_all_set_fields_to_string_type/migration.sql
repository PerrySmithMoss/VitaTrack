/*
  Warnings:

  - You are about to alter the column `distance` on the `CardioSet` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `weight` on the `StrengthSet` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `CardioSet` MODIFY `caloriesBurned` VARCHAR(191) NULL,
    MODIFY `distance` VARCHAR(191) NULL,
    MODIFY `minutes` VARCHAR(191) NULL,
    MODIFY `seconds` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `StrengthSet` MODIFY `weight` VARCHAR(191) NULL,
    MODIFY `reps` VARCHAR(191) NULL;
