import { Prisma } from "@prisma/client";

// To handle errors caught in handlers
// Is just an example -> opaque-maniac
const ErrorHandler = (err: Error, req, res, next) => {
  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint failed
        return res.status(409).json({
          message:
            "Unique constraint failed on the field(s): " + err.meta.target, //.join(", ")
        });
      case "P2025": // Record not found
        return res.status(404).json({
          message: "Record not found",
        });
      default:
        return res.status(400).json({
          message: "A database error occurred",
          error: err.message,
        });
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    // Unknown Prisma errors
    return res.status(500).json({
      message: "An unknown database error occurred",
    });
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    // Rust panic errors
    return res.status(500).json({
      message: "A database error occurred",
    });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    // Initialization errors
    return res.status(500).json({
      message: "Failed to initialize the database client",
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Validation errors
    return res.status(400).json({
      message: "Validation error",
      error: err.message,
    });
  }

  // Express validator errors
  const validationErrorPhrases = [
    "should be at least",
    "is required",
    "invalid ",
    "should be either",
  ];

  const isValidationError = validationErrorPhrases.some((phrase) =>
    err.message.toLocaleLowerCase().includes(phrase),
  );

  if (isValidationError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    message: "Something went wrong",
  });
};

export default ErrorHandler;
