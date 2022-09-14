/*
  Warnings:

  - You are about to drop the column `reps` on the `CardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `repsCompleted` on the `CardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `setNumber` on the `CardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `CardioSet` table. All the data in the column will be lost.
  - You are about to drop the column `repsCompleted` on the `StrengthSet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CardioSet` DROP COLUMN `reps`,
    DROP COLUMN `repsCompleted`,
    DROP COLUMN `setNumber`,
    DROP COLUMN `weight`,
    ADD COLUMN `caloriesBurned` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `distance` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `minutes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `seconds` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `StrengthSet` DROP COLUMN `repsCompleted`;
