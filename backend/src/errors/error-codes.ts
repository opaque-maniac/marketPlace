const APIErrorCodes = {
  generic: {
    api_error: "001",
    bad_request: "002",
  },
  not_found: {
    Customer: "201",
    Seller: "202",
    Staff: "203",
    Product: "204",
    Comment: "205",
  },
  authentication: {
    invalid_credentials: "301",
    unauthorized_access: "302",
  },
  server_error: {
    internal_server_error: "401",
    database_error: "402",
    prisma_error: "403",
  },
};

export default APIErrorCodes;
