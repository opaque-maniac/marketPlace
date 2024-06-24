import { Prisma } from "@prisma/client";
import createJWT from "../utils/createToken";
import prisma from "../utils/db";
import bcrypt from "bcrypt";

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
      },
    );

    return res.status(201).json({
      message: "Staff registered successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

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
      },
    );

    return res.status(201).json({
      message: "Staff updated successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

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

export const fetchCustomers = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const customers = await prisma.customer.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        image: true,
      },
    });

    const hasNextPage = customers.length > itemsPerPage;

    if (hasNextPage) {
      customers.pop();
    }

    return res.status(200).json({
      message: "Customers retrieved successfully",
      customers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchIndividualCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Customer retrieved successfully",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        active,
      },
    });

    return res.status(201).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Customer deleted successfully",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchProducts = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchIndividualProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return res.status(204).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellers = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const sellers = await prisma.seller.findMany({
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        image: true,
      },
    });

    const hasNextPage = sellers.length > itemsPerPage;

    if (hasNextPage) {
      sellers.pop();
    }

    return res.status(200).json({
      message: "Sellers retrieved successfully",
      sellers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchIndividualSeller = async (req, res, next) => {
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

    return res.status(200).json({
      message: "Seller retrieved successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const fetchSellerProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        sellerId: id,
      },
      skip: itemsPerPage * (page - 1),
      take: itemsPerPage + 1,
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Seller products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const seller = await prisma.seller.update({
      where: {
        id,
      },
      data: {
        active,
      },
    });

    return res.status(201).json({
      message: "Seller updated successfully",
      seller,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteSeller = async (req, res, next) => {
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

export const searchStaff = async (req, res, next) => {
  try {
    const { query } = req.params;

    const staff = await prisma.staff.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
            },
          },
          {
            firstName: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Staff retrieved successfully",
      staff,
    });
  } catch (e) {
    return next(e);
  }
};

export const searchCustomer = async (req, res, next) => {
  try {
    const { query } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
            },
          },
          {
            firstName: {
              contains: query,
            },
          },
          {
            lastName: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = customers.length > itemsPerPage;

    if (hasNextPage) {
      customers.pop();
    }

    return res.status(200).json({
      message: "Customers retrieved successfully",
      customers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const { query } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        images: true,
        seller: {
          include: {
            image: true,
          },
        },
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = products.length > itemsPerPage;

    if (hasNextPage) {
      products.pop();
    }

    return res.status(200).json({
      message: "Products retrieved successfully",
      products,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};

export const searchSeller = async (req, res, next) => {
  try {
    const { query } = req.params;
    const itemsPerPage = req.query.itemsPerPage || 20;
    const page = req.query.page || 1;

    const sellers = await prisma.seller.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
            },
          },
          {
            storeName: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
      },
      take: itemsPerPage + 1,
      skip: (page - 1) * itemsPerPage,
    });

    const hasNextPage = sellers.length > itemsPerPage;

    if (hasNextPage) {
      sellers.pop();
    }

    return res.status(200).json({
      message: "Sellers retrieved successfully",
      sellers,
      hasNextPage,
    });
  } catch (e) {
    return next(e);
  }
};
