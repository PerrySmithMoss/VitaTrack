-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `calories` INTEGER NULL,
    `protein` INTEGER NULL,
    `fat` INTEGER NULL,
    `carbohydrate` INTEGER NULL,
    `sugar` INTEGER NULL,
    `nutritionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Food` ADD CONSTRAINT `Food_nutritionId_fkey` FOREIGN KEY (`nutritionId`) REFERENCES `Nutrition`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
