/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `userIdId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_subjectId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "subjectId",
ADD COLUMN     "userIdId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userIdId_fkey" FOREIGN KEY ("userIdId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
