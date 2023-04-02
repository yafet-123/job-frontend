/*
  Warnings:

  - You are about to drop the column `link` on the `Entertainment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Entertainment" DROP COLUMN "link",
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "Image" VARCHAR(255),
ADD COLUMN     "view" INTEGER NOT NULL DEFAULT 0;
