import { Prisma } from "@prisma/client";
import db from "../../db/db";
import {
  CartItemSearchParams,
  CartSearchParams,
  CategorySearchParams,
  CommentSearchParams,
  ComplaintSearchParams,
  Condition,
  CustomerSearchParams,
  DateRange,
  MisconductSearchParams,
  OrderSearchParams,
  Pagination,
  PaymentSearchParams,
  ProductSearchParams,
  RatingSearchParams,
  SearchResult,
  SellerProfileSearchParams,
  SellerSearchParams,
  SortDirection,
  StaffSearchParams,
  UserActivitySearchParams,
  WishlistItemSearchParams,
  WishlistSearchParams,
} from "../../definitons/search";

/**
 * Bulk search/query service for paginated GET endpoints.
 *
 * This service intentionally does NOT expose single-record lookups.
 * Use Prisma findUnique/findFirst directly for those.
 *
 * PostgreSQL extension required:
 *   CREATE EXTENSION IF NOT EXISTS pg_trgm;
 *
 * All user supplied values are parameterized. Sort columns are whitelisted.
 */

export class SearchService {
  private readonly defaultLimit = 20;
  private readonly maxLimit = 100;

  // ---------------------------------------------------------------------------
  // Products
  // Product results include seller/category details, ALL product images,
  // average rating and rating count.
  // ---------------------------------------------------------------------------

  async products(params: ProductSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query) {
      conditions.push(Prisma.sql`(
        p."name" % ${query}
        OR COALESCE(p."description", '') % ${query}
      )`);
    }
    if (params.categoryId)
      conditions.push(Prisma.sql`p."categoryID" = ${params.categoryId}`);
    if (params.sellerId)
      conditions.push(Prisma.sql`p."sellerID" = ${params.sellerId}`);
    if (params.verified !== undefined)
      conditions.push(Prisma.sql`p."verified" = ${params.verified}`);
    if (params.sellerVerified !== undefined)
      conditions.push(Prisma.sql`s."verified" = ${params.sellerVerified}`);
    if (params.minPrice !== undefined)
      conditions.push(Prisma.sql`p."sellingPrice" >= ${params.minPrice}`);
    if (params.maxPrice !== undefined)
      conditions.push(Prisma.sql`p."sellingPrice" <= ${params.maxPrice}`);
    if (params.minInventory !== undefined)
      conditions.push(Prisma.sql`p."inventory" >= ${params.minInventory}`);
    if (params.maxInventory !== undefined)
      conditions.push(Prisma.sql`p."inventory" <= ${params.maxInventory}`);
    this.dateConditions(conditions, Prisma.sql`p."createdAt"`, params.created);
    this.dateConditions(conditions, Prisma.sql`p."updatedAt"`, params.updated);

    const orderBy = this.productOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
    );
    const where = this.where(conditions);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        p.*,
        c."name" AS "categoryName",
        json_build_object(
          'id', s."id",
          'name', s."name",
          'verified', s."verified",
          'active', s."active",
          'image', CASE WHEN si."id" IS NULL THEN NULL ELSE json_build_object(
            'id', si."id", 'filename', si."filename", 'createdAt', si."createdAt"
          ) END
        ) AS "seller",
        COALESCE((
          SELECT json_agg(json_build_object(
            'id', pi."id",
            'filename', pi."filename",
            'createdAt', pi."createdAt"
          ) ORDER BY pi."createdAt" ASC)
          FROM "ProductImage" pi
          WHERE pi."productID" = p."id"
        ), '[]'::json) AS "images",
        COALESCE((
          SELECT AVG(r."value")
          FROM "Ratings" r
          WHERE r."productID" = p."id"
        ), 0)::float AS "averageRating",
        (
          SELECT COUNT(*)::int
          FROM "Ratings" r
          WHERE r."productID" = p."id"
        ) AS "ratingCount",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(p."name", ${query}),
          similarity(COALESCE(p."description", ''), ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Product" p
      INNER JOIN "Category" c ON c."id" = p."categoryID"
      INNER JOIN "SellerOrganization" s ON s."id" = p."sellerID"
      LEFT JOIN "SellerImage" si ON si."sellerID" = s."id"
      ${where}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Customers
  // Includes the customer's image object.
  // ---------------------------------------------------------------------------

  async customers(
    params: CustomerSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query)
      conditions.push(Prisma.sql`(
      similarity(COALESCE(c."firstName", '') || ' ' || COALESCE(c."lastName", ''), ${query}) > 0.15
      OR similarity(COALESCE(c."email", ''), ${query}) > 0.15
    )`);
    if (params.email)
      conditions.push(
        Prisma.sql`c."email" ILIKE ${`%${params.email.trim()}%`}`,
      );
    if (params.status)
      conditions.push(Prisma.sql`c."status" = ${params.status}`);
    if (params.verified !== undefined)
      conditions.push(Prisma.sql`c."verified" = ${params.verified}`);
    if (params.active !== undefined)
      conditions.push(Prisma.sql`c."active" = ${params.active}`);
    this.dateConditions(conditions, Prisma.sql`c."createdAt"`, params.created);
    this.dateConditions(
      conditions,
      Prisma.sql`c."lastLogin"`,
      params.lastLogin,
    );

    const orderBy = this.personOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
      "c",
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        c."id", c."email", c."firstName", c."lastName",
        c."address", c."phone", c."status", c."verified", c."active",
        c."lastLogin", c."createdAt", c."updatedAt",
        CASE WHEN ci."id" IS NULL THEN NULL ELSE json_build_object(
          'id', ci."id", 'filename', ci."filename", 'createdAt', ci."createdAt"
        ) END AS "image",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(COALESCE(c."firstName", '') || ' ' || COALESCE(c."lastName", ''), ${query}),
          similarity(COALESCE(c."email", ''), ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Customer" c
      LEFT JOIN "CustomerImage" ci ON ci."customerID" = c."id"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Seller organizations
  // ---------------------------------------------------------------------------

  async sellers(params: SellerSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query)
      conditions.push(Prisma.sql`(
      s."name" % ${query}
      OR COALESCE(s."bio", '') % ${query}
      OR s."referenceNumber" % ${query}
    )`);
    if (params.referenceNumber)
      conditions.push(
        Prisma.sql`s."referenceNumber" = ${params.referenceNumber}`,
      );
    if (params.verified !== undefined)
      conditions.push(Prisma.sql`s."verified" = ${params.verified}`);
    if (params.active !== undefined)
      conditions.push(Prisma.sql`s."active" = ${params.active}`);
    this.dateConditions(conditions, Prisma.sql`s."createdAt"`, params.created);
    this.dateConditions(conditions, Prisma.sql`s."updatedAt"`, params.updated);

    const orderBy = this.sellerOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        s.*,
        CASE WHEN si."id" IS NULL THEN NULL ELSE json_build_object(
          'id', si."id", 'filename', si."filename", 'createdAt', si."createdAt"
        ) END AS "image",
        (
          SELECT COUNT(*)::int FROM "Product" p WHERE p."sellerID" = s."id"
        ) AS "productCount",
        (
          SELECT COUNT(*)::int FROM "Order" o WHERE o."sellerID" = s."id"
        ) AS "orderCount",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(s."name", ${query}),
          similarity(COALESCE(s."bio", ''), ${query}),
          similarity(s."referenceNumber", ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "SellerOrganization" s
      LEFT JOIN "SellerImage" si ON si."sellerID" = s."id"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Seller profiles
  // Includes the profile image and the linked organization's image/details.
  // ---------------------------------------------------------------------------

  async sellerProfiles(
    params: SellerProfileSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query)
      conditions.push(Prisma.sql`(
      similarity(COALESCE(sp."firstName", '') || ' ' || COALESCE(sp."lastName", ''), ${query}) > 0.15
      OR similarity(COALESCE(sp."email", ''), ${query}) > 0.15
    )`);
    if (params.organizationId)
      conditions.push(
        Prisma.sql`sp."organizationID" = ${params.organizationId}`,
      );
    if (params.role) conditions.push(Prisma.sql`sp."role" = ${params.role}`);
    if (params.status)
      conditions.push(Prisma.sql`sp."status" = ${params.status}`);
    if (params.verified !== undefined)
      conditions.push(Prisma.sql`sp."verified" = ${params.verified}`);
    if (params.active !== undefined)
      conditions.push(Prisma.sql`sp."active" = ${params.active}`);
    this.dateConditions(conditions, Prisma.sql`sp."createdAt"`, params.created);
    this.dateConditions(
      conditions,
      Prisma.sql`sp."lastLogin"`,
      params.lastLogin,
    );

    const orderBy = this.personOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
      "sp",
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        sp."id", sp."email", sp."firstName", sp."lastName",
        sp."verified", sp."active", sp."role", sp."status",
        sp."organizationID", sp."sellerImageId", sp."lastLogin",
        sp."createdAt", sp."updatedAt",
        CASE WHEN spi."id" IS NULL THEN NULL ELSE json_build_object(
          'id', spi."id", 'filename', spi."filename", 'createdAt', spi."createdAt"
        ) END AS "profileImage",
        CASE WHEN spi."id" IS NULL THEN NULL ELSE json_build_object(
          'id', spi."id", 'filename', spi."filename", 'createdAt', spi."createdAt"
        ) END AS "image",
        CASE WHEN si."id" IS NULL THEN NULL ELSE json_build_object(
          'id', si."id", 'filename', si."filename", 'createdAt', si."createdAt"
        ) END AS "organizationImage",
        json_build_object(
          'id', so."id",
          'name', so."name",
          'referenceNumber', so."referenceNumber",
          'verified', so."verified",
          'active', so."active"
        ) AS "organization",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(COALESCE(sp."firstName", '') || ' ' || COALESCE(sp."lastName", ''), ${query}),
          similarity(COALESCE(sp."email", ''), ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "SellerProfile" sp
      INNER JOIN "SellerOrganization" so ON so."id" = sp."organizationID"
      LEFT JOIN "SellerProfileImage" spi ON spi."profileID" = sp."id"
      LEFT JOIN "SellerImage" si ON si."id" = sp."sellerImageId"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Staff
  // ---------------------------------------------------------------------------

  async staff(params: StaffSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query)
      conditions.push(Prisma.sql`(
      similarity(COALESCE(st."firstName", '') || ' ' || COALESCE(st."lastName", ''), ${query}) > 0.15
      OR similarity(COALESCE(st."email", ''), ${query}) > 0.15
    )`);
    if (params.email)
      conditions.push(
        Prisma.sql`st."email" ILIKE ${`%${params.email.trim()}%`}`,
      );
    if (params.role) conditions.push(Prisma.sql`st."role" = ${params.role}`);
    if (params.status)
      conditions.push(Prisma.sql`st."status" = ${params.status}`);
    if (params.verified !== undefined)
      conditions.push(Prisma.sql`st."verified" = ${params.verified}`);
    if (params.active !== undefined)
      conditions.push(Prisma.sql`st."active" = ${params.active}`);
    this.dateConditions(conditions, Prisma.sql`st."createdAt"`, params.created);
    this.dateConditions(
      conditions,
      Prisma.sql`st."lastLogin"`,
      params.lastLogin,
    );

    const orderBy = this.personOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
      "st",
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        st."id", st."email", st."firstName", st."lastName",
        st."role", st."status", st."phone", st."address",
        st."verified", st."active", st."lastLogin",
        st."createdAt", st."updatedAt",
        CASE WHEN si."id" IS NULL THEN NULL ELSE json_build_object(
          'id', si."id", 'filename', si."filename", 'createdAt', si."createdAt"
        ) END AS "image",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(COALESCE(st."firstName", '') || ' ' || COALESCE(st."lastName", ''), ${query}),
          similarity(COALESCE(st."email", ''), ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Staff" st
      LEFT JOIN "StaffImage" si ON si."staffID" = st."id"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Orders
  // Every order contains a product summary, product image(s), seller summary,
  // customer summary and payment summary. customerId and sellerId are normal
  // bulk filters, so the same method serves customer/seller/admin endpoints.
  // ---------------------------------------------------------------------------

  async orders(params: OrderSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (params.customerId)
      conditions.push(Prisma.sql`o."customerID" = ${params.customerId}`);
    if (params.sellerId)
      conditions.push(Prisma.sql`o."sellerID" = ${params.sellerId}`);
    if (params.productId)
      conditions.push(Prisma.sql`o."productID" = ${params.productId}`);
    if (params.status)
      conditions.push(Prisma.sql`o."status" = ${params.status}`);
    if (params.paymentStatus)
      conditions.push(Prisma.sql`pay."status" = ${params.paymentStatus}`);
    if (params.minAmount !== undefined)
      conditions.push(Prisma.sql`o."totalAmount" >= ${params.minAmount}`);
    if (params.maxAmount !== undefined)
      conditions.push(Prisma.sql`o."totalAmount" <= ${params.maxAmount}`);
    if (params.minQuantity !== undefined)
      conditions.push(Prisma.sql`o."quantity" >= ${params.minQuantity}`);
    if (params.maxQuantity !== undefined)
      conditions.push(Prisma.sql`o."quantity" <= ${params.maxQuantity}`);
    if (query)
      conditions.push(Prisma.sql`(
      o."id"::text % ${query}
      OR p."name" % ${query}
      OR c."email" % ${query}
      OR (COALESCE(c."firstName", '') || ' ' || COALESCE(c."lastName", '')) % ${query}
      OR s."name" % ${query}
    )`);
    this.dateConditions(conditions, Prisma.sql`o."createdAt"`, params.created);
    this.dateConditions(conditions, Prisma.sql`o."updatedAt"`, params.updated);

    const orderBy = this.orderOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        o.*,
        json_build_object(
          'id', p."id",
          'name', p."name",
          'description', p."description",
          'sellingPrice', p."sellingPrice",
          'inventory', p."inventory",
          'verified', p."verified",
          'categoryId', p."categoryID",
          'image', (
            SELECT CASE WHEN pi."id" IS NULL THEN NULL ELSE json_build_object(
              'id', pi."id", 'filename', pi."filename", 'createdAt', pi."createdAt"
            ) END
            FROM "ProductImage" pi
            WHERE pi."productID" = p."id"
            ORDER BY pi."createdAt" ASC
            LIMIT 1
          )
        ) AS "product",
        json_build_object(
          'id', s."id",
          'name', s."name",
          'referenceNumber', s."referenceNumber",
          'verified', s."verified",
          'active', s."active",
          'image', CASE WHEN si."id" IS NULL THEN NULL ELSE json_build_object(
            'id', si."id", 'filename', si."filename", 'createdAt', si."createdAt"
          ) END
        ) AS "seller",
        json_build_object(
          'id', c."id",
          'email', c."email",
          'firstName', c."firstName",
          'lastName', c."lastName"
        ) AS "customer",
        CASE WHEN pay."id" IS NULL THEN NULL ELSE json_build_object(
          'id', pay."id", 'amount', pay."amount", 'status', pay."status", 'createdAt', pay."createdAt"
        ) END AS "payment",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(o."id"::text, ${query}),
          similarity(p."name", ${query}),
          similarity(c."email", ${query}),
          similarity(COALESCE(c."firstName", '') || ' ' || COALESCE(c."lastName", ''), ${query}),
          similarity(s."name", ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Order" o
      INNER JOIN "Product" p ON p."id" = o."productID"
      INNER JOIN "Customer" c ON c."id" = o."customerID"
      INNER JOIN "SellerOrganization" s ON s."id" = o."sellerID"
      LEFT JOIN "SellerImage" si ON si."sellerID" = s."id"
      LEFT JOIN "Payment" pay ON pay."orderID" = o."id"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;

    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Carts
  // ---------------------------------------------------------------------------

  async carts(params: CartSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.customerId)
      conditions.push(Prisma.sql`ca."customerID" = ${params.customerId}`);
    this.dateConditions(conditions, Prisma.sql`ca."createdAt"`, params.created);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        ca.*,
        COUNT(ci."id")::int AS "itemCount"
      FROM "Cart" ca
      LEFT JOIN "CartItem" ci ON ci."cartID" = ca."id"
      ${this.where(conditions)}
      GROUP BY ca."id"
      ORDER BY ${this.createdOrder("ca", params.sort)}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Cart items
  // ---------------------------------------------------------------------------

  async cartItems(
    params: CartItemSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.cartId)
      conditions.push(Prisma.sql`ci."cartID" = ${params.cartId}`);
    if (params.customerId)
      conditions.push(Prisma.sql`ca."customerID" = ${params.customerId}`);
    if (params.productId)
      conditions.push(Prisma.sql`ci."productID" = ${params.productId}`);
    if (params.sellerId)
      conditions.push(Prisma.sql`p."sellerID" = ${params.sellerId}`);
    if (params.minQuantity !== undefined)
      conditions.push(Prisma.sql`ci."quantity" >= ${params.minQuantity}`);
    if (params.maxQuantity !== undefined)
      conditions.push(Prisma.sql`ci."quantity" <= ${params.maxQuantity}`);
    this.dateConditions(conditions, Prisma.sql`ci."createdAt"`, params.created);
    this.dateConditions(conditions, Prisma.sql`ci."updatedAt"`, params.updated);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        ci.*,
        json_build_object(
          'id', p."id", 'name', p."name", 'sellingPrice', p."sellingPrice",
          'inventory', p."inventory", 'sellerId', p."sellerID"
        ) AS "product",
        s."name" AS "sellerName",
        ca."customerID"
      FROM "CartItem" ci
      INNER JOIN "Cart" ca ON ca."id" = ci."cartID"
      INNER JOIN "Product" p ON p."id" = ci."productID"
      INNER JOIN "SellerOrganization" s ON s."id" = p."sellerID"
      ${this.where(conditions)}
      ORDER BY ${this.quantityOrCreatedOrder("ci", params.sortBy, params.sort)}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Wishlists
  // ---------------------------------------------------------------------------

  async wishlists(
    params: WishlistSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.customerId)
      conditions.push(Prisma.sql`w."customerID" = ${params.customerId}`);
    this.dateConditions(conditions, Prisma.sql`w."createdAt"`, params.created);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        w.*,
        COUNT(wi."id")::int AS "itemCount"
      FROM "WishList" w
      LEFT JOIN "WishListItem" wi ON wi."wishlistID" = w."id"
      ${this.where(conditions)}
      GROUP BY w."id"
      ORDER BY ${this.createdOrder("w", params.sort)}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Wishlist items
  // ---------------------------------------------------------------------------

  async wishlistItems(
    params: WishlistItemSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.wishlistId)
      conditions.push(Prisma.sql`wi."wishlistID" = ${params.wishlistId}`);
    if (params.customerId)
      conditions.push(Prisma.sql`w."customerID" = ${params.customerId}`);
    if (params.productId)
      conditions.push(Prisma.sql`wi."productID" = ${params.productId}`);
    if (params.sellerId)
      conditions.push(Prisma.sql`p."sellerID" = ${params.sellerId}`);
    this.dateConditions(conditions, Prisma.sql`wi."createdAt"`, params.created);

    const orderBy =
      params.sortBy === "productName"
        ? this.direction(params.sort) === "asc"
          ? Prisma.sql`p."name" ASC`
          : Prisma.sql`p."name" DESC`
        : this.createdOrder("wi", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        wi.*,
        json_build_object(
          'id', p."id", 'name', p."name", 'sellingPrice', p."sellingPrice",
          'inventory', p."inventory", 'sellerId', p."sellerID"
        ) AS "product",
        s."name" AS "sellerName",
        w."customerID"
      FROM "WishListItem" wi
      INNER JOIN "WishList" w ON w."id" = wi."wishlistID"
      INNER JOIN "Product" p ON p."id" = wi."productID"
      INNER JOIN "SellerOrganization" s ON s."id" = p."sellerID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Comments
  // ---------------------------------------------------------------------------

  async comments(params: CommentSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query) conditions.push(Prisma.sql`c."message" % ${query}`);
    if (params.customerId)
      conditions.push(Prisma.sql`c."customerID" = ${params.customerId}`);
    if (params.productId)
      conditions.push(Prisma.sql`c."productID" = ${params.productId}`);
    if (params.parentId)
      conditions.push(Prisma.sql`c."parentID" = ${params.parentId}`);
    if (params.topLevelOnly) conditions.push(Prisma.sql`c."parentID" IS NULL`);
    if (params.repliesOnly)
      conditions.push(Prisma.sql`c."parentID" IS NOT NULL`);
    this.dateConditions(conditions, Prisma.sql`c."createdAt"`, params.created);

    const orderBy =
      params.sortBy === "relevance" && query
        ? Prisma.sql`similarity(c."message", ${query}) DESC, c."createdAt" DESC`
        : this.createdOrder("c", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        c.*,
        p."name" AS "productName",
        cu."email" AS "customerEmail",
        cu."firstName" AS "customerFirstName",
        cu."lastName" AS "customerLastName",
        ${query ? Prisma.sql`similarity(c."message", ${query})` : Prisma.sql`0`} AS score
      FROM "Comment" c
      INNER JOIN "Customer" cu ON cu."id" = c."customerID"
      LEFT JOIN "Product" p ON p."id" = c."productID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Ratings
  // ---------------------------------------------------------------------------

  async ratings(params: RatingSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.productId)
      conditions.push(Prisma.sql`r."productID" = ${params.productId}`);
    if (params.customerId)
      conditions.push(Prisma.sql`r."customerID" = ${params.customerId}`);
    if (params.minValue !== undefined)
      conditions.push(Prisma.sql`r."value" >= ${params.minValue}`);
    if (params.maxValue !== undefined)
      conditions.push(Prisma.sql`r."value" <= ${params.maxValue}`);
    this.dateConditions(conditions, Prisma.sql`r."createdAt"`, params.created);

    const orderBy =
      params.sortBy === "value"
        ? this.direction(params.sort) === "asc"
          ? Prisma.sql`r."value" ASC`
          : Prisma.sql`r."value" DESC`
        : this.createdOrder("r", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT r.*, p."name" AS "productName", c."email" AS "customerEmail"
      FROM "Ratings" r
      INNER JOIN "Product" p ON p."id" = r."productID"
      INNER JOIN "Customer" c ON c."id" = r."customerID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------

  async categories(
    params: CategorySearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);
    if (query) conditions.push(Prisma.sql`c."name" % ${query}`);

    const orderBy = this.categoryOrderBy(
      params.sortBy,
      params.sort,
      Boolean(query),
    );

    const rows = await db.$queryRaw<any[]>`
      SELECT
        c.*,
        COUNT(p."id")::int AS "productCount",
        ${query ? Prisma.sql`similarity(c."name", ${query})` : Prisma.sql`0`} AS score
      FROM "Category" c
      LEFT JOIN "Product" p ON p."categoryID" = c."id"
      ${this.where(conditions)}
      GROUP BY c."id"
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Complaints
  // ---------------------------------------------------------------------------

  async complaints(
    params: ComplaintSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (query)
      conditions.push(Prisma.sql`(
      c."message" % ${query}
      OR c."name" % ${query}
      OR c."email" % ${query}
      OR c."phone" % ${query}
    )`);
    if (params.email)
      conditions.push(
        Prisma.sql`c."email" ILIKE ${`%${params.email.trim()}%`}`,
      );
    if (params.staffId)
      conditions.push(Prisma.sql`c."staffID" = ${params.staffId}`);
    if (params.resolved !== undefined)
      conditions.push(Prisma.sql`c."resolved" = ${params.resolved}`);
    this.dateConditions(conditions, Prisma.sql`c."createdAt"`, params.created);

    const orderBy =
      params.sortBy === "relevance" && query
        ? Prisma.sql`GREATEST(
          similarity(c."message", ${query}), similarity(c."name", ${query}),
          similarity(c."email", ${query}), similarity(c."phone", ${query})
        ) DESC`
        : this.createdOrder("c", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        c.*,
        st."firstName" AS "staffFirstName",
        st."lastName" AS "staffLastName",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(c."message", ${query}), similarity(c."name", ${query}),
          similarity(c."email", ${query}), similarity(c."phone", ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Complaint" c
      LEFT JOIN "Staff" st ON st."id" = c."staffID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Misconducts
  // ---------------------------------------------------------------------------

  async misconducts(
    params: MisconductSearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    const query = this.cleanQuery(params.query);

    if (params.personelId)
      conditions.push(Prisma.sql`m."personelID" = ${params.personelId}`);
    if (params.customerId)
      conditions.push(Prisma.sql`m."customerID" = ${params.customerId}`);
    if (params.sellerId)
      conditions.push(Prisma.sql`m."sellerID" = ${params.sellerId}`);
    if (params.staffId)
      conditions.push(Prisma.sql`m."staffID" = ${params.staffId}`);
    if (params.response)
      conditions.push(Prisma.sql`m."response" = ${params.response}`);
    if (query)
      conditions.push(Prisma.sql`(
      m."misconduct" % ${query}
      OR m."description" % ${query}
      OR m."userEmail" % ${query}
    )`);
    this.dateConditions(conditions, Prisma.sql`m."createdAt"`, params.created);
    this.dateConditions(conditions, Prisma.sql`m."updatedAt"`, params.updated);

    const orderBy =
      params.sortBy === "relevance" && query
        ? Prisma.sql`GREATEST(
          similarity(m."misconduct", ${query}),
          similarity(m."description", ${query}),
          similarity(m."userEmail", ${query})
        ) DESC`
        : params.sortBy === "updatedAt"
          ? this.direction(params.sort) === "asc"
            ? Prisma.sql`m."updatedAt" ASC`
            : Prisma.sql`m."updatedAt" DESC`
          : this.createdOrder("m", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        m.*,
        p."firstName" AS "personelFirstName",
        p."lastName" AS "personelLastName",
        ${
          query
            ? Prisma.sql`GREATEST(
          similarity(m."misconduct", ${query}),
          similarity(m."description", ${query}),
          similarity(m."userEmail", ${query})
        )`
            : Prisma.sql`0`
        } AS score
      FROM "Misconduct" m
      INNER JOIN "Staff" p ON p."id" = m."personelID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // User activity
  // ---------------------------------------------------------------------------

  async userActivities(
    params: UserActivitySearchParams = {},
  ): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.activity)
      conditions.push(Prisma.sql`ua."activity" = ${params.activity}`);
    if (params.productId)
      conditions.push(Prisma.sql`ua."productID" = ${params.productId}`);
    if (params.customerId)
      conditions.push(Prisma.sql`ua."customerID" = ${params.customerId}`);
    if (params.guestId)
      conditions.push(Prisma.sql`ua."guestID" = ${params.guestId}`);
    this.dateConditions(conditions, Prisma.sql`ua."createdAt"`, params.created);

    const orderBy =
      params.sortBy === "activity"
        ? this.direction(params.sort) === "asc"
          ? Prisma.sql`ua."activity" ASC`
          : Prisma.sql`ua."activity" DESC`
        : this.createdOrder("ua", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        ua.*,
        p."name" AS "productName",
        c."email" AS "customerEmail"
      FROM "UserActivity" ua
      INNER JOIN "Product" p ON p."id" = ua."productID"
      LEFT JOIN "Customer" c ON c."id" = ua."customerID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Payments
  // ---------------------------------------------------------------------------

  async payments(params: PaymentSearchParams = {}): Promise<SearchResult<any>> {
    const { page, limit, offset } = this.pagination(params);
    const conditions: Condition[] = [];
    if (params.orderId)
      conditions.push(Prisma.sql`pay."orderID" = ${params.orderId}`);
    if (params.status)
      conditions.push(Prisma.sql`pay."status" = ${params.status}`);
    if (params.minAmount !== undefined)
      conditions.push(Prisma.sql`pay."amount" >= ${params.minAmount}`);
    if (params.maxAmount !== undefined)
      conditions.push(Prisma.sql`pay."amount" <= ${params.maxAmount}`);
    this.dateConditions(
      conditions,
      Prisma.sql`pay."createdAt"`,
      params.created,
    );

    const orderBy =
      params.sortBy === "amount"
        ? this.direction(params.sort) === "asc"
          ? Prisma.sql`pay."amount" ASC`
          : Prisma.sql`pay."amount" DESC`
        : params.sortBy === "status"
          ? this.direction(params.sort) === "asc"
            ? Prisma.sql`pay."status" ASC`
            : Prisma.sql`pay."status" DESC`
          : this.createdOrder("pay", params.sort);

    const rows = await db.$queryRaw<any[]>`
      SELECT
        pay.*,
        o."customerID",
        o."sellerID",
        o."productID",
        o."status" AS "orderStatus"
      FROM "Payment" pay
      INNER JOIN "Order" o ON o."id" = pay."orderID"
      ${this.where(conditions)}
      ORDER BY ${orderBy}
      LIMIT ${limit + 1}
      OFFSET ${offset}
    `;
    return this.result(rows, page, limit);
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private pagination(params: Pagination) {
    const page = Math.max(1, Math.floor(params.page ?? 1));
    const requestedLimit = Math.floor(params.limit ?? this.defaultLimit);
    const limit = Math.min(this.maxLimit, Math.max(1, requestedLimit));
    return { page, limit, offset: (page - 1) * limit };
  }

  private result<T>(rows: T[], page: number, limit: number): SearchResult<T> {
    const hasNext = rows.length > limit;
    if (hasNext) rows.pop();
    return { items: rows, hasNext, page, limit };
  }

  private cleanQuery(query?: string): string | undefined {
    if (!query) return undefined;
    const normalized = query
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ");
    return normalized || undefined;
  }

  private direction(sort?: SortDirection): SortDirection {
    return sort === "asc" ? "asc" : "desc";
  }

  private where(conditions: Condition[]): Prisma.Sql {
    return conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
      : Prisma.sql``;
  }

  private dateConditions(
    conditions: Condition[],
    column: Prisma.Sql,
    range?: DateRange,
  ) {
    if (!range) return;
    if (range.from) conditions.push(Prisma.sql`${column} >= ${range.from}`);
    if (range.to) conditions.push(Prisma.sql`${column} <= ${range.to}`);
  }

  private productOrderBy(
    sortBy: ProductSearchParams["sortBy"],
    sort: SortDirection | undefined,
    relevance: boolean,
  ): Prisma.Sql {
    const d = this.direction(sort);
    if (sortBy === "relevance" || (!sortBy && relevance))
      return Prisma.sql`score DESC, p."createdAt" DESC`;
    switch (sortBy) {
      case "name":
        return d === "asc"
          ? Prisma.sql`p."name" ASC`
          : Prisma.sql`p."name" DESC`;
      case "price":
        return d === "asc"
          ? Prisma.sql`p."sellingPrice" ASC`
          : Prisma.sql`p."sellingPrice" DESC`;
      case "inventory":
        return d === "asc"
          ? Prisma.sql`p."inventory" ASC`
          : Prisma.sql`p."inventory" DESC`;
      case "rating":
        return d === "asc"
          ? Prisma.sql`"averageRating" ASC`
          : Prisma.sql`"averageRating" DESC`;
      case "updatedAt":
        return d === "asc"
          ? Prisma.sql`p."updatedAt" ASC`
          : Prisma.sql`p."updatedAt" DESC`;
      case "createdAt":
      default:
        return d === "asc"
          ? Prisma.sql`p."createdAt" ASC`
          : Prisma.sql`p."createdAt" DESC`;
    }
  }

  private sellerOrderBy(
    sortBy: SellerSearchParams["sortBy"],
    sort: SortDirection | undefined,
    relevance: boolean,
  ): Prisma.Sql {
    const d = this.direction(sort);
    if (sortBy === "relevance" || (!sortBy && relevance))
      return Prisma.sql`score DESC, s."createdAt" DESC`;
    switch (sortBy) {
      case "name":
        return d === "asc"
          ? Prisma.sql`s."name" ASC`
          : Prisma.sql`s."name" DESC`;
      case "updatedAt":
        return d === "asc"
          ? Prisma.sql`s."updatedAt" ASC`
          : Prisma.sql`s."updatedAt" DESC`;
      case "createdAt":
      default:
        return d === "asc"
          ? Prisma.sql`s."createdAt" ASC`
          : Prisma.sql`s."createdAt" DESC`;
    }
  }

  private personOrderBy(
    sortBy:
      | CustomerSearchParams["sortBy"]
      | StaffSearchParams["sortBy"]
      | SellerProfileSearchParams["sortBy"],
    sort: SortDirection | undefined,
    relevance: boolean,
    alias: "c" | "st" | "sp",
  ): Prisma.Sql {
    const d = this.direction(sort);
    if (sortBy === "relevance" || (!sortBy && relevance))
      return Prisma.sql`score DESC, ${Prisma.raw(alias)}."createdAt" DESC`;
    switch (sortBy) {
      case "name":
        return d === "asc"
          ? Prisma.sql`${Prisma.raw(alias)}."firstName" ASC, ${Prisma.raw(alias)}."lastName" ASC`
          : Prisma.sql`${Prisma.raw(alias)}."firstName" DESC, ${Prisma.raw(alias)}."lastName" DESC`;
      case "email":
        return d === "asc"
          ? Prisma.sql`${Prisma.raw(alias)}."email" ASC`
          : Prisma.sql`${Prisma.raw(alias)}."email" DESC`;
      case "lastLogin":
        return d === "asc"
          ? Prisma.sql`${Prisma.raw(alias)}."lastLogin" ASC NULLS LAST`
          : Prisma.sql`${Prisma.raw(alias)}."lastLogin" DESC NULLS LAST`;
      case "updatedAt":
        return d === "asc"
          ? Prisma.sql`${Prisma.raw(alias)}."updatedAt" ASC`
          : Prisma.sql`${Prisma.raw(alias)}."updatedAt" DESC`;
      case "createdAt":
      default:
        return d === "asc"
          ? Prisma.sql`${Prisma.raw(alias)}."createdAt" ASC`
          : Prisma.sql`${Prisma.raw(alias)}."createdAt" DESC`;
    }
  }

  private orderOrderBy(
    sortBy: OrderSearchParams["sortBy"],
    sort: SortDirection | undefined,
    relevance: boolean,
  ): Prisma.Sql {
    const d = this.direction(sort);
    if (sortBy === "relevance" || (!sortBy && relevance))
      return Prisma.sql`score DESC, o."createdAt" DESC`;
    switch (sortBy) {
      case "amount":
        return d === "asc"
          ? Prisma.sql`o."totalAmount" ASC`
          : Prisma.sql`o."totalAmount" DESC`;
      case "quantity":
        return d === "asc"
          ? Prisma.sql`o."quantity" ASC`
          : Prisma.sql`o."quantity" DESC`;
      case "status":
        return d === "asc"
          ? Prisma.sql`o."status" ASC`
          : Prisma.sql`o."status" DESC`;
      case "updatedAt":
        return d === "asc"
          ? Prisma.sql`o."updatedAt" ASC`
          : Prisma.sql`o."updatedAt" DESC`;
      case "createdAt":
      default:
        return d === "asc"
          ? Prisma.sql`o."createdAt" ASC`
          : Prisma.sql`o."createdAt" DESC`;
    }
  }

  private categoryOrderBy(
    sortBy: CategorySearchParams["sortBy"],
    sort: SortDirection | undefined,
    relevance: boolean,
  ): Prisma.Sql {
    const d = this.direction(sort);
    if (sortBy === "relevance" || (!sortBy && relevance))
      return Prisma.sql`score DESC, c."createdAt" DESC`;
    switch (sortBy) {
      case "name":
        return d === "asc"
          ? Prisma.sql`c."name" ASC`
          : Prisma.sql`c."name" DESC`;
      case "updatedAt":
        return d === "asc"
          ? Prisma.sql`c."updatedAt" ASC`
          : Prisma.sql`c."updatedAt" DESC`;
      case "createdAt":
      default:
        return d === "asc"
          ? Prisma.sql`c."createdAt" ASC`
          : Prisma.sql`c."createdAt" DESC`;
    }
  }

  private createdOrder(alias: string, sort?: SortDirection): Prisma.Sql {
    const d = this.direction(sort);
    const a = Prisma.raw(alias);
    return d === "asc"
      ? Prisma.sql`${a}."createdAt" ASC`
      : Prisma.sql`${a}."createdAt" DESC`;
  }

  private quantityOrCreatedOrder(
    alias: string,
    sortBy?: "quantity" | "createdAt" | "updatedAt",
    sort?: SortDirection,
  ): Prisma.Sql {
    const d = this.direction(sort);
    const a = Prisma.raw(alias);
    if (sortBy === "quantity")
      return d === "asc"
        ? Prisma.sql`${a}."quantity" ASC`
        : Prisma.sql`${a}."quantity" DESC`;
    if (sortBy === "updatedAt")
      return d === "asc"
        ? Prisma.sql`${a}."updatedAt" ASC`
        : Prisma.sql`${a}."updatedAt" DESC`;
    return d === "asc"
      ? Prisma.sql`${a}."createdAt" ASC`
      : Prisma.sql`${a}."createdAt" DESC`;
  }
}

const searchService = new SearchService();

export default searchService;
