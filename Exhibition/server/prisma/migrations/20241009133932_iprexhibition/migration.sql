-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "iprRating" INTEGER NOT NULL,
    "fciptRating" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "explanationsIPR" INTEGER NOT NULL,
    "explanationsFCIPT" INTEGER NOT NULL,
    "knowledgeBefore" INTEGER NOT NULL,
    "knowledgeAfter" INTEGER NOT NULL,
    "technicalContents" INTEGER NOT NULL,
    "easeOfUnderstanding" INTEGER NOT NULL,
    "feedbackFormId" INTEGER NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_forms" (
    "id" SERIAL NOT NULL,
    "institutionName" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "staffName" TEXT NOT NULL,
    "staffEmail" TEXT NOT NULL,
    "staffMobile" TEXT NOT NULL,
    "totalStudents" INTEGER NOT NULL,
    "accompanyingStaff" INTEGER NOT NULL,
    "sources" TEXT[],
    "campuses" TEXT[],
    "best" TEXT,
    "worst" TEXT,
    "suggestions" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_forms_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ipr_exhibition_forms" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hallDimension" TEXT NOT NULL,
    "isEnclosedHall" BOOLEAN NOT NULL,
    "canBeDarkened" BOOLEAN NOT NULL,
    "hasCooling" BOOLEAN NOT NULL,
    "isGroundFloor" BOOLEAN NOT NULL,
    "hasStorageSpace" BOOLEAN NOT NULL,
    "powerOutlets" INTEGER NOT NULL,
    "numTables" INTEGER NOT NULL,
    "vrSpace" TEXT NOT NULL,
    "hasWifi" BOOLEAN NOT NULL,
    "lectureHallArea" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "hasAVFacilities" BOOLEAN NOT NULL,
    "distanceFromExhibition" TEXT NOT NULL,
    "accommodationProvided" BOOLEAN NOT NULL,
    "localTransportation" BOOLEAN NOT NULL,
    "secureParkingSpace" BOOLEAN NOT NULL,
    "manpowerForLoading" BOOLEAN NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonMobile" TEXT NOT NULL,
    "contactPersonEmail" TEXT NOT NULL,
    "venueLocation" TEXT NOT NULL,
    "teacherInvitation" BOOLEAN NOT NULL,
    "teacherRegistration" BOOLEAN NOT NULL,
    "providesWritingMaterials" BOOLEAN NOT NULL,
    "providesRefreshments" BOOLEAN NOT NULL,
    "quizForSchoolStudents" BOOLEAN NOT NULL,
    "quizTeamSelection" BOOLEAN NOT NULL,
    "quizArrangements" BOOLEAN NOT NULL,
    "quizRefreshments" BOOLEAN NOT NULL,

    CONSTRAINT "ipr_exhibition_forms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_feedbackFormId_key" ON "ratings"("feedbackFormId");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_feedbackFormId_fkey" FOREIGN KEY ("feedbackFormId") REFERENCES "feedback_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
