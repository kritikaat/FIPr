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
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "affiliationNumber" TEXT NOT NULL,
    "coordinatorTeacherName" TEXT NOT NULL,
    "coordinatorTeacherMobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "participant1Name" TEXT NOT NULL,
    "participant1Gender" TEXT NOT NULL,
    "participant1Class" TEXT NOT NULL,
    "participant1Accommodation" TEXT NOT NULL,
    "participant2Name" TEXT,
    "participant2Gender" TEXT,
    "participant2Class" TEXT,
    "participant2Accommodation" TEXT,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccompanyingTeacher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccompanyingTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competition" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "StudentModel2" (
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

    CONSTRAINT "StudentModel2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EloquenceEnglish" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EloquenceEnglish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EloquenceHindi" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EloquenceHindi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EloquenceGujarati" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EloquenceGujarati_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssayEnglish" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "essay_file_url" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssayEnglish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssayHindi" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "essay_file_url" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssayHindi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssayGujarati" (
    "id" SERIAL NOT NULL,
    "participantName" TEXT NOT NULL,
    "participantGender" TEXT NOT NULL,
    "participantClass" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "essay_file_url" TEXT NOT NULL,
    "declaration" BOOLEAN NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EssayGujarati_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poster" (
    "id" SERIAL NOT NULL,
    "participant1Name" TEXT NOT NULL,
    "participant1Gender" TEXT NOT NULL,
    "participant1Class" TEXT NOT NULL,
    "participant1Accommodation" TEXT NOT NULL,
    "participant1Declaration" BOOLEAN NOT NULL,
    "participant2Name" TEXT,
    "participant2Gender" TEXT,
    "participant2Class" TEXT,
    "participant2Accommodation" TEXT,
    "participant2Declaration" BOOLEAN,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skit" (
    "id" SERIAL NOT NULL,
    "participant1Name" TEXT NOT NULL,
    "participant1Gender" TEXT NOT NULL,
    "participant1Class" TEXT NOT NULL,
    "participant1Accommodation" TEXT NOT NULL,
    "participant2Name" TEXT,
    "participant2Gender" TEXT,
    "participant2Class" TEXT,
    "participant2Accommodation" TEXT,
    "participant3Name" TEXT,
    "participant3Gender" TEXT,
    "participant3Class" TEXT,
    "participant3Accommodation" TEXT,
    "participant4Name" TEXT,
    "participant4Gender" TEXT,
    "participant4Class" TEXT,
    "participant4Accommodation" TEXT,
    "participant5Name" TEXT,
    "participant5Gender" TEXT,
    "participant5Class" TEXT,
    "participant5Accommodation" TEXT,
    "participant6Name" TEXT,
    "participant6Gender" TEXT,
    "participant6Class" TEXT,
    "participant6Accommodation" TEXT,
    "additionalRequirements" TEXT,
    "declaration" BOOLEAN NOT NULL,
    "videoLink" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherModel" (
    "id" SERIAL NOT NULL,
    "teacherName" TEXT NOT NULL,
    "teacherGender" TEXT NOT NULL,
    "accommodationRequired" TEXT NOT NULL,
    "additionalRequirements" TEXT,
    "declaration" BOOLEAN NOT NULL,
    "writeup" TEXT NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolRegistration" (
    "id" SERIAL NOT NULL,
    "schoolName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "cityVillage" VARCHAR(100) NOT NULL,
    "pincode" VARCHAR(10) NOT NULL,
    "affiliationNumber" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_feedbackFormId_key" ON "ratings"("feedbackFormId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolRegistration_email_key" ON "SchoolRegistration"("email");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_feedbackFormId_fkey" FOREIGN KEY ("feedbackFormId") REFERENCES "feedback_forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccompanyingTeacher" ADD CONSTRAINT "AccompanyingTeacher_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competition" ADD CONSTRAINT "Competition_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModel1" ADD CONSTRAINT "StudentModel1_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModel2" ADD CONSTRAINT "StudentModel2_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EloquenceEnglish" ADD CONSTRAINT "EloquenceEnglish_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EloquenceHindi" ADD CONSTRAINT "EloquenceHindi_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EloquenceGujarati" ADD CONSTRAINT "EloquenceGujarati_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayEnglish" ADD CONSTRAINT "EssayEnglish_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayHindi" ADD CONSTRAINT "EssayHindi_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayGujarati" ADD CONSTRAINT "EssayGujarati_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poster" ADD CONSTRAINT "Poster_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skit" ADD CONSTRAINT "Skit_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherModel" ADD CONSTRAINT "TeacherModel_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
