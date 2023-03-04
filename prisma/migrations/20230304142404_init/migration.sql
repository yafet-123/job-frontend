/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseCategoryRelationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseCategory" DROP CONSTRAINT "CourseCategory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseCategoryRelationship" DROP CONSTRAINT "CourseCategoryRelationship_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseCategoryRelationship" DROP CONSTRAINT "CourseCategoryRelationship_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseCategoryRelationship" DROP CONSTRAINT "CourseCategoryRelationship_user_id_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseCategory";

-- DropTable
DROP TABLE "CourseCategoryRelationship";

-- CreateTable
CREATE TABLE "HTMLCourse" (
    "course_id" SERIAL NOT NULL,
    "title" TEXT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HTMLCourse_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CSSCourse" (
    "course_id" SERIAL NOT NULL,
    "title" TEXT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CSSCourse_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "JavascriptCourse" (
    "course_id" SERIAL NOT NULL,
    "title" TEXT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JavascriptCourse_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "PythonCourse" (
    "course_id" SERIAL NOT NULL,
    "title" TEXT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PythonCourse_pkey" PRIMARY KEY ("course_id")
);

-- AddForeignKey
ALTER TABLE "HTMLCourse" ADD CONSTRAINT "HTMLCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CSSCourse" ADD CONSTRAINT "CSSCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptCourse" ADD CONSTRAINT "JavascriptCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PythonCourse" ADD CONSTRAINT "PythonCourse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
