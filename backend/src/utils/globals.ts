import multer, { Multer } from "multer";

export const stringConfig = {
  min: 2,
  max: 255,
};

export const passwordConfig = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export const createStorage = (folder: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${folder}/`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
};

export const productCategories = [
  "ELECTRONICS",
  "FASHION",
  "HOME",
  "BEAUTY",
  "SPORTS",
  "FOOD",
  "BOOKS",
  "TOYS",
  "OTHER",
];

export const serverError = new Error("Internal server error");

export const floatRegex = /^[-+]?\d*\.\d+$|^[-+]?\+$/;
