-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "institutionName" TEXT NOT NULL,
    "studentBranch" TEXT NOT NULL,
    "studentSem" INTEGER NOT NULL,
    "numStudents" INTEGER NOT NULL,
    "numFaculty" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "campus" TEXT[],
    "ipr_time" TEXT,
    "fcipt_time" TEXT,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "visit_time" TEXT NOT NULL,
    "materials" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
