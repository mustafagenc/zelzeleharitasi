-- CreateTable
CREATE TABLE "Earthquakes" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "magnitude" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "city" TEXT,

    CONSTRAINT "Earthquakes_pkey" PRIMARY KEY ("id")
);
