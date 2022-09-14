-- AlterTable
ALTER TABLE `Exercise` MODIFY `exerciseType` VARCHAR(191) NOT NULL DEFAULT 'Strength',
    MODIFY `unilateral` BOOLEAN NULL DEFAULT false;
