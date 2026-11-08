BEGIN;
CREATE UNIQUE INDEX "Nutrition_userId_date_key" ON "Nutrition"("userId", "date");
DROP INDEX "Nutrition_date_key";
COMMIT;
