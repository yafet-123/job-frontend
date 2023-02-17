-- CreateTable
CREATE TABLE "Entertainment" (
    "entertainment_id" SERIAL NOT NULL,
    "Header" TEXT,
    "link" VARCHAR(255),
    "user_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entertainment_pkey" PRIMARY KEY ("entertainment_id")
);

-- CreateTable
CREATE TABLE "EntertainmentCategory" (
    "category_id" SERIAL NOT NULL,
    "CategoryName" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntertainmentCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "EntertainmentCategoryRelationship" (
    "entertainment_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "entertainment_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntertainmentCategoryRelationship_pkey" PRIMARY KEY ("entertainment_category_id")
);

-- AddForeignKey
ALTER TABLE "Entertainment" ADD CONSTRAINT "Entertainment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntertainmentCategory" ADD CONSTRAINT "EntertainmentCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EntertainmentCategoryRelationship" ADD CONSTRAINT "EntertainmentCategoryRelationship_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "EntertainmentCategory"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntertainmentCategoryRelationship" ADD CONSTRAINT "EntertainmentCategoryRelationship_entertainment_id_fkey" FOREIGN KEY ("entertainment_id") REFERENCES "Entertainment"("entertainment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntertainmentCategoryRelationship" ADD CONSTRAINT "EntertainmentCategoryRelationship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
