import prisma from "../../utils/db";

// Fetch all customers
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

// Fetch individual customer
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

// Update customer profile
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

// Delete customer profile
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

// Search for customer
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
