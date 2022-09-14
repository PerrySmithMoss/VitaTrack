/*
  Warnings:

  - You are about to drop the column `bodyWeight` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Workout` DROP COLUMN `bodyWeight`,
    ADD COLUMN `bodyweight` INTEGER NULL;
