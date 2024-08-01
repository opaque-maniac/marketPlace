import prisma from "../../utils/db";

// Search for staff
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
