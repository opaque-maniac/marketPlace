-- AlterTable
CREATE SEQUENCE staff_staffid_seq;
ALTER TABLE "Staff" ALTER COLUMN "staffId" SET DEFAULT nextval('staff_staffid_seq');
ALTER SEQUENCE staff_staffid_seq OWNED BY "Staff"."staffId";
