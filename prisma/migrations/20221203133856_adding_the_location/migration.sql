/*
  Warnings:

  - You are about to drop the column `Location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "Location",
ADD COLUMN     "location_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "location_id" SERIAL NOT NULL,
    "LocationName" VARCHAR(255) NOT NULL,
    "Image" VARCHAR(255),
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
