/*
  Warnings:

  - Made the column `workoutId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Exercise` DROP FOREIGN KEY `Exercise_workoutId_fkey`;

-- AlterTable
ALTER TABLE `CardioSet` ADD COLUMN `setNumber` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `Exercise` MODIFY `workoutId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
