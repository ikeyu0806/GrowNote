-- CreateEnum
CREATE TYPE "public"."GoalStatus" AS ENUM ('ongoing', 'completed', 'abandoned');

-- CreateTable
CREATE TABLE "public"."Goal" (
    "id" UUID NOT NULL,
    "slug" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" DATE,
    "status" "public"."GoalStatus" NOT NULL DEFAULT 'ongoing',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_slug_key" ON "public"."Goal"("slug");
