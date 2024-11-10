-- AlterTable
ALTER TABLE "AccompanyingTeacher" ALTER COLUMN "requiresAccommodation" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EloquenceEnglish" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EloquenceGujarati" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EloquenceHindi" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EssayEnglish" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EssayGujarati" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EssayHindi" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Poster" ALTER COLUMN "participant1Declaration" SET DATA TYPE TEXT,
ALTER COLUMN "participant2Declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Skit" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StudentModel1" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StudentModel2" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TeacherModel" ALTER COLUMN "declaration" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "IPRExhibitionForm" (
    "id" SERIAL NOT NULL,
    "hallDimension" TEXT NOT NULL,
    "isEnclosedHall" TEXT NOT NULL,
    "canBeDarkened" TEXT NOT NULL,
    "hasCooling" TEXT NOT NULL,
    "isGroundFloor" TEXT NOT NULL,
    "hasStorageSpace" TEXT NOT NULL,
    "powerOutlets" INTEGER NOT NULL,
    "numTables" INTEGER NOT NULL,
    "vrSpace" TEXT NOT NULL,
    "hasWifi" TEXT NOT NULL,
    "lectureHallArea" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "hasAVFacilities" TEXT NOT NULL,
    "distanceFromExhibition" TEXT NOT NULL,
    "accommodationProvided" TEXT NOT NULL,
    "localTransportation" TEXT NOT NULL,
    "secureParkingSpace" TEXT NOT NULL,
    "manpowerForLoading" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonMobile" TEXT NOT NULL,
    "contactPersonEmail" TEXT NOT NULL,
    "venueLocation" TEXT NOT NULL,
    "teacherInvitation" INTEGER NOT NULL,
    "teacherRegistration" INTEGER NOT NULL,
    "providesWritingMaterials" TEXT NOT NULL,
    "providesRefreshments" TEXT NOT NULL,
    "quizForSchoolStudents" TEXT NOT NULL,
    "quizTeamSelection" TEXT NOT NULL,
    "quizArrangements" TEXT NOT NULL,
    "quizRefreshments" TEXT NOT NULL,

    CONSTRAINT "IPRExhibitionForm_pkey" PRIMARY KEY ("id")
);
