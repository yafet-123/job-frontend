-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "CategoryName" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Job" (
    "job_id" SERIAL NOT NULL,
    "CompanyName" VARCHAR(255) NOT NULL,
    "Image" VARCHAR(255),
    "JobsType" VARCHAR(255) NOT NULL,
    "CareerLevel" VARCHAR(255) NOT NULL,
    "EmploymentType" VARCHAR(255) NOT NULL,
    "Salary" VARCHAR(255) NOT NULL,
    "JobsDescreption" TEXT,
    "JobsRequirement" TEXT,
    "DeadLine" DATE NOT NULL,
    "Apply" VARCHAR(255) NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "Location" (
    "location_id" SERIAL NOT NULL,
    "LocationName" VARCHAR(255) NOT NULL,
    "Image" VARCHAR(255),
    "user_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "UserName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "Password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255),
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "job_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("job_category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_UserName_key" ON "User"("UserName");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
