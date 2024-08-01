import { Prisma } from "@prisma/client";
import createJWT from "../../utils/createToken";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";

// Login staff
export const loginStaff = async (req, res, next) => {
  try {
    const { email, staffId, password } = req.body;

    const staff = await prisma.staff.findFirst({
      where: {
        email,
        staffId,
      },
    });

    if (!staff) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (staff.active === false) {
      return res.status(400).json({
        message: "Account is inactive",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, staff.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = createJWT(staff);

    return res.status(200).json({
      message: "Login successful",
      staff,
      token,
    });
  } catch (e) {
    return next(e);
  }
};

// Register staff
export const registerStaff = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password, role } = req.body;
    const fileName = `http://localhost:5173/staffImages/${req.files[0].filename}`;

    const staff = await prisma.$transaction(
      async (txl) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaff = await txl.staff.create({
          data: role
            ? {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role,
              }
            : {
                email,
                firstName,
                lastName,
                password: hashedPassword,
              },
        });

        await txl.staffImage.create({
          data: {
            imageUrl: fileName,
            staffId: newStaff.id,
          },
        });

        return newStaff;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(201).json({
      message: "Staff registered successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

// Retrieve staff profile
export const retrieveStaffProfiles = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const staff = await prisma.staff.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        image: true,
      },
    });

    const hasNextPage = staff.length > itemsPerPage;

    if (hasNextPage) {
      staff.pop();
    }

    return res.status(200).json({
      message: "Staff profiles retrieved successfully",
      staff,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

// Retrieve other staff profile
export const retrieveIndividualStaffProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Staff profile retrieved successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

// Update staff profile
export const updateIndividualStaffProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, password, role, active } = req.body;
    let fileName = null;

    if (req.files.length !== 0) {
      fileName = `http://localhost:5173/staffImages/${req.files[0].filename}`;
    }

    const staff = await prisma.$transaction(
      async (txl) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedStaff = await txl.staff.update({
          where: {
            id,
          },
          data: active
            ? {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role,
                active,
              }
            : {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role,
              },
        });

        if (fileName) {
          await txl.staffImage.update({
            where: {
              staffId: id,
            },
            data: {
              imageUrl: fileName,
            },
          });
        }

        return updatedStaff;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(201).json({
      message: "Staff updated successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete staff profile
export const deleteStaffProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const staff = await prisma.staff.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Staff profile deleted successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};
