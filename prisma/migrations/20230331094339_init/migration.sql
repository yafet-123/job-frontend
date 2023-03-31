-- CreateTable
CREATE TABLE "AiCategory" (
    "category_id" SERIAL NOT NULL,
    "CategoryName" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AiCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Detail" (
    "detail_id" SERIAL NOT NULL,
    "Header" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "like" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "service" TEXT[],
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("detail_id")
);

-- CreateTable
CREATE TABLE "DetailCategory" (
    "detail_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "detail_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DetailCategory_pkey" PRIMARY KEY ("detail_category_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "author_id" INTEGER NOT NULL,
    "detail_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "author_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Author_pkey" PRIMARY KEY ("author_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- AddForeignKey
ALTER TABLE "AiCategory" ADD CONSTRAINT "AiCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailCategory" ADD CONSTRAINT "DetailCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "AiCategory"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailCategory" ADD CONSTRAINT "DetailCategory_detail_id_fkey" FOREIGN KEY ("detail_id") REFERENCES "Detail"("detail_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailCategory" ADD CONSTRAINT "DetailCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("author_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_detail_id_fkey" FOREIGN KEY ("detail_id") REFERENCES "Detail"("detail_id") ON DELETE CASCADE ON UPDATE CASCADE;
