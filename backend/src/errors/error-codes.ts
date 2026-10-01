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
    CartItem: "206,",
    WishlistItem: "207",
  },
  authentication: {
    invalid_credentials: "301",
    unauthorized_access: "302",
    unverified_profile: "303",
    unverified_seller_org: "304",
    disabled_profie: "305",
  },
  token: {
    invalid_security_token: "401",
    invalid_access_token: "402",
    invalid_refresh_token: "403",
  },
  server_error: {
    internal_server_error: "501",
    database_error: "502",
    resend_error: "503",
  },
};

export default APIErrorCodes;
