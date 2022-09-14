/*
  Warnings:

  - You are about to drop the column `type` on the `Workout` table. All the data in the column will be lost.
  - Made the column `unilateral` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `CardioSet` MODIFY `notes` VARCHAR(191) NULL,
    MODIFY `caloriesBurned` INTEGER NULL,
    MODIFY `distance` INTEGER NULL,
    MODIFY `minutes` INTEGER NULL,
    MODIFY `seconds` INTEGER NULL;

-- AlterTable
ALTER TABLE `Exercise` ALTER COLUMN `exerciseType` DROP DEFAULT,
    MODIFY `unilateral` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `StrengthSet` MODIFY `setNumber` INTEGER NOT NULL DEFAULT 1,
    MODIFY `weight` INTEGER NULL,
    MODIFY `reps` INTEGER NULL,
    MODIFY `notes` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Workout` DROP COLUMN `type`;
