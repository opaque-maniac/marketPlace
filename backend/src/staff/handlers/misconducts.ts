import { Response, NextFunction } from "express";
import { AuthenticatedRequest, NewMisconductRequest } from "../../types";
import { serverError } from "../../utils/globals";
import prisma from "../../utils/db";
import { RESPONSE } from "@prisma/client";
import { addToWishlist } from "../../customer/handlers/wishlist";

const parseResponse = (resp: string) => {
  switch (resp) {
    case RESPONSE.DELETE_PROFILE:
    case RESPONSE.DISABLE_PROFILE:
    case RESPONSE.WARN_USER:
      return resp as RESPONSE;
    default:
      return undefined;
  }
};

export const fetchMisconducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const response = req.query.response
      ? parseResponse(req.query.status as string)
      : undefined;

    const misconducts = await prisma.misconduct.findMany({
      where: query
        ? {
            response,
            OR: [
              {
                id: query,
              },
              {
                customer: {
                  firstName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                customer: {
                  lastName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                seller: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                staff: {
                  firstName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                staff: {
                  lastName: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
              {
                userEmail: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {
            response,
          },
      include: {
        seller: {
          include: {
            image: true,
          },
        },
        staff: {
          include: {
            image: true,
          },
        },
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = misconducts.length > limit;

    if (hasNext) {
      misconducts.pop();
    }

    res.status(200).json({
      message: "Fetched misconducts",
      misconducts,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

// sorry
export const fetchIndividualMisconduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const misconduct = await prisma.misconduct.findUnique({
      where: { id },
      include: {
        seller: {
          include: {
            image: true,
          },
        },
        staff: {
          include: {
            image: true,
          },
        },
        customer: {
          include: {
            image: true,
          },
        },
        personel: {
          include: {
            image: true,
          },
        },
      },
    });

    if (!misconduct) {
      throw new Error("Misconduct not found");
    }

    res.status(200).json({
      message: "Fetched misconduct",
      misconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const updateMisconduct = async (
  req: NewMisconductRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { misconduct, description, action } = req.body;

    const newMisconduct = await prisma.misconduct.update({
      where: { id },
      data: {
        misconduct,
        description,
        response: action,
      },
    });

    res.status(200).json({
      message: "Updated misconduct",
      misconduct: newMisconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const deleteMisconduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.misconduct.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Updated misconduct",
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const createCustomerMisconduct = async (
  req: NewMisconductRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { misconduct, description, action } = req.body;

    if (!user) {
      throw new Error("User not found");
    }

    const personel = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!personel) {
      throw new Error("User not found");
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const newMisconduct = await prisma.misconduct.create({
      data: {
        personelID: personel.id,
        misconduct,
        description,
        response: action,
        customerID: customer.id,
        userEmail: customer.email,
      },
    });

    res.status(201).json({
      message: "Created customer misconduct",
      newMisconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchCustomerMisconducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const response = req.query.response
      ? parseResponse(req.query.status as string)
      : undefined;

    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const misconducts = await prisma.misconduct.findMany({
      where: {
        response,
        customerID: customer.id,
        OR: [
          {
            id: query,
          },
          {
            misconduct: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            personel: {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            personel: {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = misconducts.length > limit;

    if (hasNext) {
      misconducts.pop();
    }

    res.status(200).json({
      message: "Misconducts found",
      misconducts,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const createSellerMisconduct = async (
  req: NewMisconductRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { misconduct, description, action } = req.body;

    if (!user) {
      throw new Error("User not found");
    }

    const personel = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!personel) {
      throw new Error("User not found");
    }

    const seller = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    if (!seller) {
      throw new Error("Seller not found");
    }

    const newMisconduct = await prisma.misconduct.create({
      data: {
        personelID: personel.id,
        misconduct,
        description,
        response: action,
        sellerID: seller.id,
        userEmail: seller.email,
      },
    });

    res.status(201).json({
      message: "Created seller misconduct",
      newMisconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchSellerMisconducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const response = req.query.response
      ? parseResponse(req.query.status as string)
      : undefined;

    const seller = await prisma.seller.findUnique({
      where: {
        id,
      },
    });

    if (!seller) {
      throw new Error("Seller not found");
    }

    const misconducts = await prisma.misconduct.findMany({
      where: {
        response,
        sellerID: seller.id,
        OR: [
          {
            id: query,
          },
          {
            misconduct: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            personel: {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            personel: {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = misconducts.length > limit;

    if (hasNext) {
      misconducts.pop();
    }

    res.status(200).json({
      message: "Misconducts found",
      misconducts,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const createStaffMisconduct = async (
  req: NewMisconductRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { misconduct, description, action } = req.body;

    if (!user) {
      throw new Error("User not found");
    }

    const personel = await prisma.staff.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!personel) {
      throw new Error("User not found");
    }

    if (personel.id === id) {
      throw new Error("Unauthorized");
    }

    const staff = await prisma.staff.findUnique({
      where: {
        id,
      },
    });

    if (!staff) {
      throw new Error("Staff not found");
    }

    if (staff.id === personel.id) {
      throw new Error("Unauthorized");
    }

    const newMisconduct = await prisma.misconduct.create({
      data: {
        personelID: personel.id,
        misconduct,
        description,
        response: action,
        staffID: staff.id,
        userEmail: staff.email,
      },
    });

    res.status(201).json({
      message: "Created staff misconduct",
      newMisconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const fetchStaffMisconducts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const query = req.query.query ? (req.query.query as string) : "";
    const response = req.query.response
      ? parseResponse(req.query.status as string)
      : undefined;

    const staff = await prisma.staff.findUnique({
      where: {
        id,
      },
    });

    if (!staff) {
      throw new Error("Staff not found");
    }

    const misconducts = await prisma.misconduct.findMany({
      where: {
        response,
        staffID: staff.id,
        OR: [
          {
            id: query,
          },
          {
            misconduct: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            personel: {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            personel: {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        customer: {
          include: {
            image: true,
          },
        },
      },
      take: limit + 1,
      skip: (page - 1) * limit,
    });

    const hasNext = misconducts.length > limit;

    if (hasNext) {
      misconducts.pop();
    }

    res.status(200).json({
      message: "Misconducts found",
      misconducts,
      hasNext,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};

export const newMisconduct = async (
  req: NewMisconductRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, misconduct, description, action } = req.body;
    const { user } = req;

    if (!user) {
      throw new Error("User not found");
    }

    const seller = await prisma.seller.findUnique({
      where: {
        email,
      },
    });

    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    const staff = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    const _misconduct = await prisma.misconduct.create({
      data: {
        staffID: staff?.id || undefined,
        customerID: customer?.id || undefined,
        sellerID: seller?.id || undefined,
        misconduct,
        description,
        response: action,
        personelID: user.id,
        userEmail: email,
      },
    });

    res.status(200).json({
      message: "Created misconduct",
      misconduct: _misconduct,
    });
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(serverError);
  }
};
