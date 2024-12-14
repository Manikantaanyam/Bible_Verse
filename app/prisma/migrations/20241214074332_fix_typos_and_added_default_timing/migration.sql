/*
  Warnings:

  - You are about to drop the `Stroy` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Verse" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Stroy";

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "storyName" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);
