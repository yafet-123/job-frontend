-- CreateTable
CREATE TABLE "Blogs" (
    "blogs_id" SERIAL NOT NULL,
    "Header" TEXT,
    "Image" VARCHAR(255),
    "ShortDescription" TEXT,
    "Description" TEXT,
    "view" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("blogs_id")
);

-- CreateTable
CREATE TABLE "BlogsCategory" (
    "category_id" SERIAL NOT NULL,
    "CategoryName" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogsCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "BlogsCategoryRelationship" (
    "blogs_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "blogs_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogsCategoryRelationship_pkey" PRIMARY KEY ("blogs_category_id")
);

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogsCategory" ADD CONSTRAINT "BlogsCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BlogsCategoryRelationship" ADD CONSTRAINT "BlogsCategoryRelationship_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "BlogsCategory"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogsCategoryRelationship" ADD CONSTRAINT "BlogsCategoryRelationship_blogs_id_fkey" FOREIGN KEY ("blogs_id") REFERENCES "Blogs"("blogs_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogsCategoryRelationship" ADD CONSTRAINT "BlogsCategoryRelationship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
