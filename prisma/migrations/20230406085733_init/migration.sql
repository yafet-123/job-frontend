/*
  Warnings:

  - You are about to drop the column `Apply` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `EmploymentType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobsDescreption` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobsRequirement` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobsType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_location_id_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "Apply",
DROP COLUMN "EmploymentType",
DROP COLUMN "JobsDescreption",
DROP COLUMN "JobsRequirement",
DROP COLUMN "JobsType",
DROP COLUMN "location_id",
ADD COLUMN     "Descreption" TEXT,
ADD COLUMN     "JobsName" VARCHAR(255),
ADD COLUMN     "shortDescreption" TEXT,
ALTER COLUMN "CompanyName" DROP NOT NULL,
ALTER COLUMN "CareerLevel" DROP NOT NULL,
ALTER COLUMN "Salary" DROP NOT NULL,
ALTER COLUMN "DeadLine" DROP NOT NULL,
ALTER COLUMN "DeadLine" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "_JobToLocation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToLocation_AB_unique" ON "_JobToLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToLocation_B_index" ON "_JobToLocation"("B");

-- AddForeignKey
ALTER TABLE "_JobToLocation" ADD CONSTRAINT "_JobToLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToLocation" ADD CONSTRAINT "_JobToLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;
