/*
  Warnings:

  - You are about to drop the column `cityVillage` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `coordinatorTeacher` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `School` table. All the data in the column will be lost.
  - You are about to drop the `CompetitionSelection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentModel1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinatorTeacherMobile` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinatorTeacherName` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompetitionSelection" DROP CONSTRAINT "CompetitionSelection_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModel1" DROP CONSTRAINT "StudentModel1_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_schoolId_fkey";

-- DropIndex
DROP INDEX "School_email_key";

-- DropIndex
DROP INDEX "School_userId_key";

-- AlterTable
ALTER TABLE "School" DROP COLUMN "cityVillage",
DROP COLUMN "coordinatorTeacher",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "schoolName",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "coordinatorTeacherMobile" TEXT NOT NULL,
ADD COLUMN     "coordinatorTeacherName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "CompetitionSelection";

-- DropTable
DROP TABLE "StudentModel1";

-- DropTable
DROP TABLE "Teacher";

-- CreateTable
CREATE TABLE "AccompanyingTeacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "AccompanyingTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "additionalRequirements" TEXT,
    "competitionId" INTEGER NOT NULL,
    "writeup" TEXT,
    "declaration" BOOLEAN NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccompanyingTeacher" ADD CONSTRAINT "AccompanyingTeacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
