import multer from "multer";

type ImageType = "customer" | "seller" | "staff" | "product" | "seller-staff";

export function createStorage(imgType: ImageType) {
  const dirName = `uploads/${imgType}`;
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${dirName}/`);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
}
