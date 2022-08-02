import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader } from "./graphql/Auth";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: string;
  adminId?: string;
}

export const context = ({ req }: { req: Request }): Context => {   // 2
    const token =
        req && req.headers.authorization
            ? decodeAuthHeader(req.headers.authorization)
            : null;
    return {  
        prisma,
        userId: token?.userId,
        adminId: token?.adminId 
    };
};

// 1: First you have defined the Context interface, which specifies what objects will be attached to the context object. Right now it’s just an instance of PrismaClient, but this can change as the project grows.
// 2: You’re exporting the context object, so that it can be imported and used by the GraphQL server.