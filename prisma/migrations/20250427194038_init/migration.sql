/*
  Warnings:

  - Added the required column `priority` to the `Earthquakes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zIndexOffset` to the `Earthquakes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Earthquakes" ADD COLUMN     "priority" TEXT NOT NULL,
ADD COLUMN     "zIndexOffset" INTEGER NOT NULL;
