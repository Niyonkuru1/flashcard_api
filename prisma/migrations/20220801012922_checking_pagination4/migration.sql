-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_userId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
