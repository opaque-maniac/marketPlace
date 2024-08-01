import prisma from "../../utils/db";

// Function to create a complaint
export const createComplaint = async (req, res, next) => {
  try {
    const { email, name, phone, message } = req.body;

    const complaint = await prisma.complaints.create({
      data: {
        name,
        phone: phone ?? null,
        email,
        message,
      },
    });

    return res.status(201).json({
      message: "Complaint created",
      complaint,
    });
  } catch (e) {
    return next(e);
  }
};
