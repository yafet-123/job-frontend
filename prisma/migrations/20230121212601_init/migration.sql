-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
