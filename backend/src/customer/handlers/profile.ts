import { Prisma } from "@prisma/client";
import createJWT from "../../utils/createToken";
import prisma from "../../utils/db";
import bcrypt from "bcrypt";

// Register customer
export const registerCustomer = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await prisma.$transaction(
      async (txl) => {
        const customer = await txl.customer.create({
          data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        await txl.cart.create({
          data: {
            customerId: customer.id,
          },
        });

        await txl.favorites.create({
          data: {
            customerId: customer.id,
          },
        });

        return customer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    res.status(201).json({
      message: "Customer created",
      customer,
    });
  } catch (e) {
    e.type = "validation";
    return next(e);
  }
};

// Login customer
export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await prisma.customer.findFirst({
      where: {
        email,
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
        favorites: {
          include: {
            favoriteItems: true,
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    if (customer.active === false) {
      return res.status(401).json({
        message: "Account is deactivated, contact admin",
      });
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createJWT(customer);

    res.status(200).json({
      message: "Login successful",
      customer,
      token,
    });
  } catch (e) {
    e.type = "validation";
    return next(e);
  }
};

// Fetch customer profile
export const fetchCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Fetching profile for ${id}`);

    const customer = await prisma.customer.findFirst({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });

    return res.status(200).json({
      message: "Fetched customer",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Update customer profile
export const updateCustomerProfile = async (req, res, next) => {
  try {
    const { email, firstName, lastName, address, city, country, phone } =
      req.body;
    const fileName = req.files[0].filename;

    const oldCustomer = await prisma.customer.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        image: true,
      },
    });

    if (!oldCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const customer = await prisma.$transaction(
      async (txl) => {
        const customer = await txl.customer.update({
          where: {
            id: req.params.id,
          },
          data: {
            email,
            firstName,
            lastName,
            address,
            city,
            country,
            phone,
          },
        });

        if (fileName) {
          if (oldCustomer.image) {
            await txl.customerImage.update({
              where: {
                id: oldCustomer.image.id,
              },
              data: {
                imageUrl: `http://localhost:5173/customerImages/${fileName}`,
              },
            });
          } else {
            await txl.customerImage.create({
              data: {
                customerId: customer.id,
                imageUrl: `http://localhost:5173/customerImages/${fileName}`,
              },
            });
          }
        }

        return customer;
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );

    return res.status(200).json({
      message: "Updated customer",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};

// Delete customer profile
export const deleteCustomerPofile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Customer deleted",
      customer,
    });
  } catch (e) {
    return next(e);
  }
};
