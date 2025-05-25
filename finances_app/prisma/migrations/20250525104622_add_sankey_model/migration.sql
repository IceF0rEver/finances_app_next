-- CreateTable
CREATE TABLE "sankey" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "type" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "sankey_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sankey" ADD CONSTRAINT "sankey_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "sankey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sankey" ADD CONSTRAINT "sankey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
