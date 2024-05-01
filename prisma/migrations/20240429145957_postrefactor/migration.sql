/*
  Warnings:

  - Added the required column `address` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Distributor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Distributor" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "name" TEXT NOT NULL;
