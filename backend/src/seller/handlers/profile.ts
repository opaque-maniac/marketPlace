import { Prisma } from "@prisma/client";
import createJWT from "../../utils/createToken";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";

// Register seller
export const registerSeller = async (req, res, next) => {
  try {
    const { email, storeName, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const seller = await prisma.seller.create({
      data: {
        email,
        storeName,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Registration successful",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

// Login seller
export const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const seller = await prisma.seller.findFirst({
      where: {
        email,
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    if (seller.active == false) {
      return res.status(401).json({
        message: "Account not activated",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createJWT(seller);

    return res.status(200).json({
      message: "Login successful",
      seller,
      token,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      message: "Seller fetched successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      firstName,
      lastName,
      storeName,
      address,
      phone,
      city,
      country,
    } = req.body;

    let fileNames = [];

    if (req.files.length !== 0) {
      fileNames = req.files.map(
        (file) => `http://localhost:3000/sellerImages/${file.filename}`
      );
    }

    const seller = await prisma.$transaction(
      async (txl) => {
        if (fileNames.length !== 0) {
          const imageObj = fileNames.map((image) => {
            return {
              imageUrl: image,
              sellerId: id,
            };
          });

          try {
            await txl.sellerImage.deleteMany({
              where: {
                sellerId: id,
              },
            });
          } catch (e) {
            console.log("No files found");
          }

          await txl.sellerImage.createMany({
            data: imageObj,
          });
        }

        const updatedSeller = await txl.seller.update({
          where: {
            id,
          },
          data: {
            email,
            storeName,
            firstName: firstName ?? null,
            lastName: lastName ?? null,
            address: address ?? null,
            phone: phone ?? null,
            city: city ?? null,
            country: country ?? null,
          },
        });

        return updatedSeller;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Seller updated successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteSellerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const seller = await prisma.seller.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Seller deleted successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};
