-- CreateTable
CREATE TABLE "StudentModel1" (
    "id" SERIAL NOT NULL,
    "participant1Name" TEXT NOT NULL,
    "participant1Gender" TEXT NOT NULL,
    "participant1Class" TEXT NOT NULL,
    "participant1Accommodation" TEXT NOT NULL,
    "participant2Name" TEXT NOT NULL,
    "participant2Gender" TEXT NOT NULL,
    "participant2Class" TEXT NOT NULL,
    "participant2Accommodation" TEXT NOT NULL,
    "additionalRequirements" TEXT,
    "declaration" BOOLEAN NOT NULL,
    "writeup" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentModel1_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentModel1" ADD CONSTRAINT "StudentModel1_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
