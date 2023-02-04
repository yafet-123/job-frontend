-- CreateTable
CREATE TABLE "News" (
    "news_id" SERIAL NOT NULL,
    "Header" TEXT,
    "Image" VARCHAR(255),
    "ShortDescription" TEXT,
    "Description" TEXT,
    "user_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("news_id")
);

-- CreateTable
CREATE TABLE "NewsCategory" (
    "category_id" SERIAL NOT NULL,
    "CategoryName" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "NewsCategoryRelationship" (
    "news_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "news_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsCategoryRelationship_pkey" PRIMARY KEY ("news_category_id")
);

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCategory" ADD CONSTRAINT "NewsCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NewsCategoryRelationship" ADD CONSTRAINT "NewsCategoryRelationship_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategory"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCategoryRelationship" ADD CONSTRAINT "NewsCategoryRelationship_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("news_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsCategoryRelationship" ADD CONSTRAINT "NewsCategoryRelationship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
