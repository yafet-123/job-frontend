/*
  Warnings:

  - You are about to drop the `_JobToLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_JobToLocation" DROP CONSTRAINT "_JobToLocation_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobToLocation" DROP CONSTRAINT "_JobToLocation_B_fkey";

-- DropTable
DROP TABLE "_JobToLocation";

-- CreateTable
CREATE TABLE "JobLocation" (
    "job_location_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "location_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobLocation_pkey" PRIMARY KEY ("job_location_id")
);

-- AddForeignKey
ALTER TABLE "JobLocation" ADD CONSTRAINT "JobLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLocation" ADD CONSTRAINT "JobLocation_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobLocation" ADD CONSTRAINT "JobLocation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
