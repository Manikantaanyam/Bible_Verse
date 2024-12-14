-- CreateTable
CREATE TABLE "Verse" (
    "id" SERIAL NOT NULL,
    "verse" TEXT NOT NULL,
    "loc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stroy" (
    "id" SERIAL NOT NULL,
    "storyName" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stroy_pkey" PRIMARY KEY ("id")
);
