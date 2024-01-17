-- CreateTable
CREATE TABLE "Producer" (
    "id" SERIAL NOT NULL,
    "document" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "areaPlanted" DOUBLE PRECISION NOT NULL,
    "areaHarvested" DOUBLE PRECISION NOT NULL,
    "culture" TEXT[],

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_document_key" ON "Producer"("document");
