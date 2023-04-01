/*
  Warnings:

  - Made the column `user_id` on table `AiCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `DetailCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AiCategory" DROP CONSTRAINT "AiCategory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "DetailCategory" DROP CONSTRAINT "DetailCategory_user_id_fkey";

-- AlterTable
ALTER TABLE "AiCategory" ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "DetailCategory" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AiCategory" ADD CONSTRAINT "AiCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DetailCategory" ADD CONSTRAINT "DetailCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE NO ACTION;
