/*
  Warnings:

  - You are about to drop the column `description` on the `Competition` table. All the data in the column will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_competitionId_fkey";

-- AlterTable
ALTER TABLE "Competition" DROP COLUMN "description";

-- DropTable
DROP TABLE "Participant";
