/*
  Warnings:

  - You are about to alter the column `calories` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `protein` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fat` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `carbohydrate` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `sugar` on the `Food` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Food` MODIFY `calories` DOUBLE NULL,
    MODIFY `protein` DOUBLE NULL,
    MODIFY `fat` DOUBLE NULL,
    MODIFY `carbohydrate` DOUBLE NULL,
    MODIFY `sugar` DOUBLE NULL;
