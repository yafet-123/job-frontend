/*
  Warnings:

  - Changed the type of `like` on the `Detail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "like",
ADD COLUMN     "like" INTEGER NOT NULL;
